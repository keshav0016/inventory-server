const fs = require('fs')
require('dotenv').config();
var later = require('later');
const moment = require('moment')
const xlsx = require('node-xlsx')
const api = require('./config/sendGrid')
const models = require('./models/index')
const sgMail = require('@sendgrid/mail')


// sgMail.setApiKey(api);
var credentials = {
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    redirect_uris: process.env.REDIRECT_URIS.split(",")[0]
}

var filesId;
var historyRepair = []
var repairDetails = {}
var employeeDetails = {};
var historyAssigned = []
var consumableDetails = [];
var fileId = process.env.FILE_ID
var folderId = process.env.FOLDER_ID

// var sched = later.parse.recur().every(30).second(),
var sched = later.parse.recur().on('11:30:00').time().onWeekday() ,
t = later.setInterval(itemStatusReportEmail, sched);
var limitDate = new Date(Number(new Date()))
console.log('scheduler has started')

// Function to send the resource request email
function itemStatusReportEmail() {
    var assetDetails = [];
    var assetTickets = [];
    var adminsDetails = [];
    var vendorDetails = [];
    var consumableTickets = [];
    var allEmployeeDetails = [];
    var assetsRepairDetails = [];
    var assetsAssignedDetails = [];
    var consumablesAssignedDetails = [];
    var consumablesPurchaseDetails = [];

    models.ticket.findAll({
        include: [{
            model: models.users,
            attributes: ['first_name', 'last_name']
        }],
        where: {
            item_type: 'consumables',
            createdAt: {
                lte: limitDate
            }
        }
    })
        .then(totalConsumable => {
            consumableTickets.push(...totalConsumable);

            return models.ticket.findAll({
                include: [{
                    model: models.users,
                    attributes: ['first_name', 'last_name']
                }],
                where: {
                    item_type: 'assets',
                    createdAt: {
                        lte: limitDate
                    }
                }
            })
        })
        .then(assets => {
            assetTickets.push(...assets);

            return models.vendor.findAll({
                where: {
                    createdAt: {
                        lte: limitDate
                    }
                }
            })
        })
        .then(vendor => {
            vendorDetails.push(...vendor);

            return models.consumables_assigned.findAll({
                include: [{
                    model: models.users,
                    attributes: ['first_name', 'last_name'],
                }],
                where: {
                    createdAt: {
                        lte: limitDate
                    }
                }
            })
        })
        .then(consumablesassigned => {
            consumablesAssignedDetails.push(...consumablesassigned)

            return models.consumables_purchased.findAll({
                include: [{
                    model: models.consumables, required: true
                }],
                where: {
                    createdAt: {
                        lte: limitDate
                    }
                }
            })
        })
        .then(consumablespurchased => {
            consumablesPurchaseDetails.push(...consumablespurchased)

            return models.assets.findAll({
                where: {
                    createdAt: {
                        lte: limitDate
                    }
                }
            })
        })
        .then(assets => {
            assetDetails.push(...assets)

            return models.assets_assigned.findAll({
                include: [
                    {
                        model: models.users,
                        attributes: ['first_name', 'last_name']
                    },
                    {
                        model: models.assets,
                        attributes: ['serial_number']
                    }
                ],
                where: {
                    createdAt: {
                        lte: limitDate
                    }
                }
            })
        })
        .then(assetsassigned => {
            assetsAssignedDetails.push(...assetsassigned)

            return models.assets_repair.findAll({
                where: {
                    createdAt: {
                        lte: limitDate
                    }
                }
            })
        })
        .then(assetsrepair => {
            assetsRepairDetails.push(...assetsrepair)

            return models.users.scope('withoutPassword').findAll({
                where: {
                    createdAt: {
                        lte: limitDate
                    }
                }
            })
        })
        .then(employeedetails => {
            allEmployeeDetails.push(...employeedetails)

            return models.Admin.scope('withoutPassword').findAll({
                where: {
                    createdAt: {
                        lte: limitDate
                    }
                }
            })
        })
        .then(admins => {
            adminsDetails.push(...admins)

            if (assetTickets.length !== 0) {

                var AssetRequests = [
                    [
                        "User", "Ticket No", "Asset Type", "Asset Name", "Quantity", "Status", "Admin", "Reason"
                    ]
                ]

                assetTickets.map(e => {

                    return AssetRequests.push(
                        [
                            `${e.user ? e.user.first_name + "" + e.user.last_name : "Nil"}`,
                            `${e.ticket_number}`,
                            `${e.requested_asset_item}`,
                            `${e.asset_name}`,
                            `${e.quantity}`,
                            `${e.status}`,
                            `${e.adminName}`,
                            `${e.reason}`
                        ]
                    )
                })
            } else {
                var AssetRequests = [
                    [
                        "User", "Ticket No", "Asset Type", "Asset Name", "Quantity", "Status", "Admin", "Reason"
                    ],
                    [
                        "Nil", "Nil", "Nil", "Nil", "Nil", "Nil", "Nil", "Nil"
                    ]
                ]
            }

            if (consumableTickets.length !== 0) {
                var ConsumableRequests = [
                    [
                        "User", "Ticket No", "Consumable Name", "Quantity", "Status", "Admin", "Reason"
                    ]
                ]

                consumableTickets.map(e => {
                    return ConsumableRequests.push(
                        [
                            `${e.user ? e.user.first_name + "" + e.user.last_name : "Nil"}`,
                            `${e.ticket_number}`,
                            `${e.requested_consumable_item}`,
                            `${e.quantity}`,
                            `${e.status}`,
                            `${e.adminName}`,
                            `${e.reason}`
                        ]
                    )
                })
            } else {
                var ConsumableRequests = [
                    [
                        "User", "Ticket No", "Consumable Name", "Quantity", "Status", "Admin", "Reason"
                    ],
                    [
                        "Nil", "Nil", "Nil", "Nil", "Nil", "Nil", "Nil"
                    ]
                ]
            }

            if (assetDetails.length !== 0) {
                var AssetPurchaseDetails = [
                    [
                        "Asset Id", "Asset Type", "Asset Name", "Category", "Amount", "GST", "Total", "Vendor name", "Purchased Date"
                    ]
                ]

                assetDetails.map(e => {
                    return AssetPurchaseDetails.push(
                        [
                            // `${e.serial_number}`
                            `${e.asset_id}`,
                            `${e.assetType}`,
                            `${e.asset_name}`,
                            `${e.category}`,
                            `${e.amount}`,
                            `${e.gst}`,
                            `${e.total}`,
                            `${e.vendor}`,
                            `${moment(e.purchase_date).format('DD/MM/YYYY')}`
                        ])
                })

            } else {
                var AssetPurchaseDetails = [
                    [
                        "Asset Id", "Asset Type", "Asset Name", "Category", "Amount", "GST", "Total", "Vendor name", "Purchased Date"
                    ],
                    [
                        "Nil", "Nil", "Nil", "Nil", "Nil", "Nil", "Nil", "Nil", "Nil"
                    ]
                ]

            }

            if (assetsAssignedDetails.length !== 0) {
                var AssetAssignedDetails = [
                    [
                        // "User Id","Employee Name","Ticket Number","From","Expected Recovery","To"
                        "Asset Id", "User Id", "Employee Name", "Serial number", "Ticket Number", "From", "To", "Assigned by"

                    ]
                ]

                assetsAssignedDetails.map(element => {
                    return AssetAssignedDetails.push([
                        `${element.asset_id}`,
                        `${element.user_id}`,
                        `${element.user ? element.user.first_name + "" + element.user.last_name : "Nil"}`,
                        `${element.asset ? element.asset.serial_number : "Nil"}`,
                        `${element.ticket_number ? element.ticket_number : "Nil"}`,
                        `${moment(element.from).format('DD/MM/YYYY')}`,
                        // `${moment(element.expected_recovery).format('DD/MM/YYYY')}`,
                        `${element.to ? moment(element.to).format('DD/MM/YYYY') : "Nil"}`,
                        `${element.adminName ? element.adminName : "Nil"}`,

                    ])
                })
            } else {
                var AssetAssignedDetails = [
                    [
                        "User Id", "Employee Name", "Ticket Number", "From", "To", "Assigned by"
                    ],
                    [
                        "Nil", "Nil", "Nil", "Nil", "Nil", "Nil"
                    ]
                ]
            }

            if (assetsRepairDetails.length !== 0) {
                var AssetRepairDetails = [
                    [
                        "Asset Id", "Servicer Name", "From", "Expected Delivery", "To", "Repair Invoice", "Amount", "GST", "Total"
                    ]
                ]

                assetsRepairDetails.map(element => {
                    return AssetRepairDetails.push([
                        `${element.asset_id}`,
                        `${element.vendor}`,
                        `${moment(element.from).format('DD/MM/YYYY')}`,
                        `${moment(element.expected_delivery).format('DD/MM/YYYY')}`,
                        `${element.to ? moment(element.to).format('DD/MM/YYYY') : "Nil"}`,
                        `${element.repair_invoice}`,
                        `${element.amount}`,
                        `${element.gst}`,
                        `${element.total}`
                    ])
                })
            } else {
                var AssetRepairDetails = [
                    [
                        "Asset Id", "Servicer Name", "From", "Expected Delivery", "To", "Repair Invoice", "Amount", "GST", "Total"
                    ],
                    [
                        "Nil", "Nil", "Nil", "Nil", "Nil", "Nil", "Nil", "Nil", "Nil"
                    ]
                ]
            }

            if (consumablesPurchaseDetails.length !== 0) {
                var ConsumableDetails = [
                    [
                        'Id', 'Name', 'Purchase Quantity', 'Present Quantity', 'Vendor', 'Purchase Date', 'Individual Price', 'Collective Price', 'GST', 'Total'
                    ]
                ]

                consumablesPurchaseDetails.map(element => {
                    if (!element.user) {
                        return ConsumableDetails.push([
                            `${element.consumable_id}`,
                            `${element.consumable.name}`,
                            `${element.quantity}`,
                            `${element.consumable.quantity}`,
                            `${element.vendor_name}`,
                            `${moment(element.purchase_date).format('DD/MM/YYYY')}`,
                            `${element.item_price}`,
                            `${element.whole_price}`,
                            `${element.gst}`,
                            `${element.total}`
                        ])
                    }
                })
            } else {
                var ConsumableDetails = [
                    [
                        'Id', 'Name', 'Purchase Quantity', 'Present Quantity', 'Vendor', 'Purchase Date', 'Individual Price', 'Collective Price', 'GST', 'Total'
                    ],
                    [
                        "Nil", "Nil", "Nil", "Nil", "Nil", "Nil", "Nil", "Nil", "Nil", "Nil"
                    ]
                ]
            }

            if (consumablesAssignedDetails.length !== 0) {
                var ConsumableAssignedDetails = [
                    [
                        "Employee Id", 'Employee Name', "Assigned Quantity", "Assigned Date", "Ticket Number", "Assigned by"
                    ]
                ]

                consumablesAssignedDetails.map(element => {
                    if (element.user) {
                        return ConsumableAssignedDetails.push([
                            `${element.user_id}`,
                            `${element.user.first_name}${element.user.last_name}`,
                            `${element.quantity}`,
                            `${moment(element.assigned_date).format('DD/MM/YYYY')}`,
                            `${element.ticket_number ? element.ticket_number : "Nil"}`,
                            `${element.adminName ? element.adminName : "Nil"}`,

                        ])
                    }
                })
            } else {
                var ConsumableAssignedDetails = [
                    [
                        "Employee Id", 'Employee Name', "Assigned Quantity", "Assigned Date", "Ticket Number", "Assigned by"
                    ],
                    [
                        "Nil", "Nil", "Nil", "Nil", "Nil", "Nil"
                    ]
                ]
            }

            if (vendorDetails.length !== 0) {
                var VendorsList = [
                    [
                        'Vendor Name', "Address", "Mobile No", "Landline No"
                    ]
                ]

                vendorDetails.map(element => {
                    return VendorsList.push([
                        `${element.name}`,
                        `${element.address}`,
                        `${element.contact}`,
                        `${element.landline ? element.landline.code : 'Nil'}-${element.landline ? element.landline.number : 'Nil'}`,

                    ])

                })
            } else {
                var VendorsList = [
                    [
                        'Vendor Name', "Address", "Mobile No", "Landline No"
                    ],
                    [
                        "Nil", "Nil", "Nil", "Nil"
                    ]
                ]
            }

            if (allEmployeeDetails.length !== 0) {
                var EmployeeList = [
                    [
                        'Employee Id', 'Employee Name', "Email", "Department", "Designation", "Age", "Gender"
                    ]
                ]

                allEmployeeDetails.map(element => {

                    return EmployeeList.push([
                        `${element.user_id}`,
                        `${element.first_name} ${element.last_name}`,
                        `${element.email}`,
                        `${element.department}`,
                        `${element.designation}`,
                        `${element.age}`,
                        `${element.gender}`,

                    ])

                })
            } else {
                var EmployeeList = [
                    [
                        'Employee Id', 'Employee Name', "Email", "Department", "Designation", "Age", "Gender"
                    ],
                    [
                        "Nil", "Nil", "Nil", "Nil", "Nil", "Nil", "Nil"
                    ]
                ]
            }

            //google api
            const readline = require('readline');
            const { google } = require('googleapis');

            //create token.json file

            var tokenContent = {
                token_type: process.env.TOKEN_TYPE,
                expiry_date: process.env.EXPIRY_DATE,
                access_token: process.env.ACCESS_TOKEN,
                refresh_token: process.env.REFRESH_TOKEN,

            }
            // console.log(JSON.stringify(tokenContent))

            //Comment the below function after the token generation
            fs.writeFile('token.json', JSON.stringify(tokenContent), (err) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log('token.json file has been created')
                }
            })

            // If modifying these scopes, delete credentials.json.
            const SCOPES = ['https://www.googleapis.com/auth/drive'];
            const TOKEN_PATH = 'token.json';

            // Load client secrets from a local file.
            // fs.readFile('credentials.json', (err, content) => {
            // if (err) return console.log('Error loading client secret file:', err);
            // // Authorize a client with credentials, then call the Google Drive API.
            // authorize(JSON.parse(content), updateFile);
            // });
            authorize(credentials, updateFiles)

            /**
             * Create an OAuth2 client with the given credentials, and then execute the
             * given callback function.
             * @param {Object} credentials The authorization client credentials.
             * @param {function} callback The callback to call with the authorized client.
             */
            function authorize(credentials, callback) {
                const {
                    client_id,
                    client_secret,
                    redirect_uris,
                } = credentials;

                const oAuth2Client = new google.auth.OAuth2(
                    client_id,
                    client_secret,
                    redirect_uris
                );

                // Check if we have previously stored a token.
                fs.readFile(TOKEN_PATH, (err, token) => {
                    if (err) return getAccessToken(oAuth2Client, callback);
                    oAuth2Client.setCredentials(JSON.parse(token));
                    callback(oAuth2Client);
                });
            }

            /**
             * Get and store new token after prompting for user authorization, and then
             * execute the given callback with the authorized OAuth2 client.
             * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
             * @param {getEventsCallback} callback The callback for the authorized client.
             */
            function getAccessToken(oAuth2Client, callback) {
                const authUrl = oAuth2Client.generateAuthUrl({
                    access_type: 'offline',
                    scope: SCOPES,
                });
                console.log('Authorize this app by visiting this url:', authUrl);
                const rl = readline.createInterface({
                    input: process.stdin,
                    output: process.stdout,
                });
                rl.question('Enter the code from that page here: ', (code) => {
                    rl.close();
                    oAuth2Client.getToken(code, (err, token) => {
                        if (err) return callback(err);
                        oAuth2Client.setCredentials(token);
                        // Store the token to disk for later program executions
                        fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
                            if (err) console.error(err);
                            console.log('Token stored to', TOKEN_PATH);
                        });
                        callback(oAuth2Client);
                    });
                });
            }

            /**
             * Lists the names and IDs of up to 10 files.
             * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
             */




            //api to create a file in drive

            function createFiles(auth) {
                const drive = google.drive({
                    version: 'v3',
                    auth
                });
                var fileMetadata = {
                    'name': 'IMS-report.xlsx',
                    parents: [folderId],
                    'mimeType': 'application/vnd.google-apps.spreadsheet'

                };
                var media = {
                    mimeType: 'plain/vnd.google-apps.spreadsheet',
                    body: fs.createReadStream('./report.xlsx')
                };
                drive.files.create({
                    resource: fileMetadata,
                    media: media,
                    fields: 'id'
                }, function (err, file) {
                    if (err) {
                        console.error(err);
                    } else {
                        console.log(file)
                        filesId = file.data.id
                        // fileId = file.data.id
                        console.log('file has been created')
                    }
                });

            }
            var buffer = xlsx.build([{
                name: 'Asset Requests',
                data: AssetRequests
            },
            {
                name: 'Consumable Requests',
                data: ConsumableRequests
            },
            {
                name: 'Asset Details',
                data: AssetPurchaseDetails
            },
            {
                name: 'Asset Assigned Details',
                data: AssetAssignedDetails
            },
            {
                name: 'Asset Repair Details',
                data: AssetRepairDetails
            },
            {
                name: 'Consumables Details',
                data: ConsumableDetails
            },
            {
                name: 'Consumables Assigned details',
                data: ConsumableAssignedDetails
            },
            {
                name: 'Vendors',
                data: VendorsList
            },
            {
                name: "Employees",
                data: EmployeeList
            },
            ]);
            fs.writeFileSync('report.xlsx', buffer, 'binary');
            //google drive api to update a file  
            function listFiles(auth) {
                const drive = google.drive({
                    version: 'v3',
                    auth
                });
                drive.files.list({
                    pageSize: 10,
                    fields: 'nextPageToken, files(id, name)',
                }, (err, res) => {
                    if (err) return console.log('The API returned an error: ' + err);
                    const files = res.data.files;
                    if (files.length) {
                        console.log('Files:');
                        files.map((file) => {
                            console.log(`${file.name} (${file.id})`);
                        });
                    } else {
                        console.log('No files found.');
                    }
                });
            }

            function updateFiles(auth) {
                const drive = google.drive({
                    version: 'v3',
                    auth
                });

                var media = {
                    mimeType: 'plain/vnd.google-apps.spreadsheet',
                    body: fs.createReadStream('./report.xlsx')
                };

                drive.files.update({
                    fileId,
                    media,
                    // folderId
                },
                    function (err, file) {
                        if (err) {
                            console.error(err);
                        } else {
                            console.log('file has been updated')
                            fs.unlinkSync('./report.xlsx')
                        }
                    })
            }




        })
        .catch(error => {
            console.log(error)
        })
}