--
-- PostgreSQL database dump
--

-- Dumped from database version 10.3
-- Dumped by pg_dump version 10.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: SequelizeMeta; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."SequelizeMeta" (
    name character varying(255) NOT NULL
);


ALTER TABLE public."SequelizeMeta" OWNER TO postgres;

--
-- Name: assets; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.assets (
    id integer NOT NULL,
    asset_id integer NOT NULL,
    serial_number character varying(255),
    asset_name character varying(255),
    purchase_date timestamp with time zone,
    description character varying(255),
    invoice_number character varying(255),
    vendor character varying(255),
    amount double precision,
    gst double precision,
    total double precision,
    current_status character varying(255),
    category character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    condition character varying(255),
    location character varying(255),
    "assetType" character varying(255),
    disabled integer
);


ALTER TABLE public.assets OWNER TO postgres;

--
-- Name: assets_asset_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.assets_asset_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.assets_asset_id_seq OWNER TO postgres;

--
-- Name: assets_asset_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.assets_asset_id_seq OWNED BY public.assets.asset_id;


--
-- Name: assets_assigneds; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.assets_assigneds (
    id integer NOT NULL,
    asset_id integer,
    user_id character varying(255),
    ticket_number integer,
    "from" timestamp with time zone,
    "to" timestamp with time zone,
    expected_recovery timestamp with time zone,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.assets_assigneds OWNER TO postgres;

--
-- Name: assets_assigneds_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.assets_assigneds_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.assets_assigneds_id_seq OWNER TO postgres;

--
-- Name: assets_assigneds_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.assets_assigneds_id_seq OWNED BY public.assets_assigneds.id;


--
-- Name: assets_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.assets_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.assets_id_seq OWNER TO postgres;

--
-- Name: assets_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.assets_id_seq OWNED BY public.assets.id;


--
-- Name: assets_repairs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.assets_repairs (
    id integer NOT NULL,
    asset_id integer,
    vendor character varying(255),
    "from" timestamp with time zone,
    "to" timestamp with time zone,
    expected_delivery timestamp with time zone,
    repair_invoice character varying(255),
    amount double precision,
    gst double precision,
    total double precision,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.assets_repairs OWNER TO postgres;

--
-- Name: assets_repairs_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.assets_repairs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.assets_repairs_id_seq OWNER TO postgres;

--
-- Name: assets_repairs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.assets_repairs_id_seq OWNED BY public.assets_repairs.id;


--
-- Name: consumables; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.consumables (
    id integer NOT NULL,
    consumable_id integer NOT NULL,
    name character varying(255),
    quantity integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.consumables OWNER TO postgres;

--
-- Name: consumables_assigneds; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.consumables_assigneds (
    id integer NOT NULL,
    consumable_id integer,
    user_id character varying(255),
    ticket_number integer,
    assigned_date timestamp with time zone,
    quantity integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.consumables_assigneds OWNER TO postgres;

--
-- Name: consumables_assigneds_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.consumables_assigneds_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.consumables_assigneds_id_seq OWNER TO postgres;

--
-- Name: consumables_assigneds_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.consumables_assigneds_id_seq OWNED BY public.consumables_assigneds.id;


--
-- Name: consumables_consumable_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.consumables_consumable_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.consumables_consumable_id_seq OWNER TO postgres;

--
-- Name: consumables_consumable_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.consumables_consumable_id_seq OWNED BY public.consumables.consumable_id;


--
-- Name: consumables_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.consumables_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.consumables_id_seq OWNER TO postgres;

--
-- Name: consumables_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.consumables_id_seq OWNED BY public.consumables.id;


--
-- Name: consumables_purchaseds; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.consumables_purchaseds (
    id integer NOT NULL,
    consumable_id integer,
    vendor_name character varying(255),
    purchase_date timestamp with time zone,
    quantity integer,
    item_price double precision,
    whole_price double precision,
    discount double precision,
    gst double precision,
    total double precision,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.consumables_purchaseds OWNER TO postgres;

--
-- Name: consumables_purchaseds_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.consumables_purchaseds_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.consumables_purchaseds_id_seq OWNER TO postgres;

--
-- Name: consumables_purchaseds_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.consumables_purchaseds_id_seq OWNED BY public.consumables_purchaseds.id;


--
-- Name: qrs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.qrs (
    id integer NOT NULL,
    asset_id integer,
    qr_code_link character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.qrs OWNER TO postgres;

--
-- Name: qrs_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.qrs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.qrs_id_seq OWNER TO postgres;

--
-- Name: qrs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.qrs_id_seq OWNED BY public.qrs.id;


--
-- Name: tickets; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tickets (
    id integer NOT NULL,
    user_id character varying(255),
    ticket_number integer NOT NULL,
    date timestamp with time zone,
    requested_asset_id integer,
    requested_asset_item character varying(255),
    requested_consumable_id integer,
    requested_consumable_item character varying(255),
    item_type character varying(255),
    quantity integer,
    department character varying(255),
    status character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    reason character varying(255)
);


ALTER TABLE public.tickets OWNER TO postgres;

--
-- Name: tickets_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tickets_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tickets_id_seq OWNER TO postgres;

--
-- Name: tickets_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tickets_id_seq OWNED BY public.tickets.id;


--
-- Name: tickets_ticket_number_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tickets_ticket_number_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tickets_ticket_number_seq OWNER TO postgres;

--
-- Name: tickets_ticket_number_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tickets_ticket_number_seq OWNED BY public.tickets.ticket_number;


--
-- Name: types; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.types (
    id integer NOT NULL,
    "assetType" character varying(255) NOT NULL,
    "maxRequest" integer DEFAULT 1,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.types OWNER TO postgres;

--
-- Name: types_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.types_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.types_id_seq OWNER TO postgres;

--
-- Name: types_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.types_id_seq OWNED BY public.types.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    user_id character varying(255) NOT NULL,
    first_name character varying(255),
    last_name character varying(255),
    age integer,
    gender character varying(255),
    password character varying(255),
    role character varying(255),
    token text[],
    department character varying(255),
    designation character varying(255),
    "createdAt" timestamp with time zone,
    "updatedAt" timestamp with time zone,
    email character varying(255)
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: vendors; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.vendors (
    id integer NOT NULL,
    name character varying(255),
    address character varying(255),
    contact character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.vendors OWNER TO postgres;

--
-- Name: vendors_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.vendors_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.vendors_id_seq OWNER TO postgres;

--
-- Name: vendors_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.vendors_id_seq OWNED BY public.vendors.id;


--
-- Name: assets id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.assets ALTER COLUMN id SET DEFAULT nextval('public.assets_id_seq'::regclass);


--
-- Name: assets asset_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.assets ALTER COLUMN asset_id SET DEFAULT nextval('public.assets_asset_id_seq'::regclass);


--
-- Name: assets_assigneds id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.assets_assigneds ALTER COLUMN id SET DEFAULT nextval('public.assets_assigneds_id_seq'::regclass);


--
-- Name: assets_repairs id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.assets_repairs ALTER COLUMN id SET DEFAULT nextval('public.assets_repairs_id_seq'::regclass);


--
-- Name: consumables id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.consumables ALTER COLUMN id SET DEFAULT nextval('public.consumables_id_seq'::regclass);


--
-- Name: consumables consumable_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.consumables ALTER COLUMN consumable_id SET DEFAULT nextval('public.consumables_consumable_id_seq'::regclass);


--
-- Name: consumables_assigneds id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.consumables_assigneds ALTER COLUMN id SET DEFAULT nextval('public.consumables_assigneds_id_seq'::regclass);


--
-- Name: consumables_purchaseds id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.consumables_purchaseds ALTER COLUMN id SET DEFAULT nextval('public.consumables_purchaseds_id_seq'::regclass);


--
-- Name: qrs id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.qrs ALTER COLUMN id SET DEFAULT nextval('public.qrs_id_seq'::regclass);


--
-- Name: tickets id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tickets ALTER COLUMN id SET DEFAULT nextval('public.tickets_id_seq'::regclass);


--
-- Name: tickets ticket_number; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tickets ALTER COLUMN ticket_number SET DEFAULT nextval('public.tickets_ticket_number_seq'::regclass);


--
-- Name: types id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.types ALTER COLUMN id SET DEFAULT nextval('public.types_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Name: vendors id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vendors ALTER COLUMN id SET DEFAULT nextval('public.vendors_id_seq'::regclass);


--
-- Data for Name: SequelizeMeta; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."SequelizeMeta" (name) FROM stdin;
20180320112550-create-users.js
20180321052408-create-assets.js
20180321053036-create-assets-assigned.js
20180321053727-create-assets-repair.js
20180321054136-create-ticket.js
20180321054845-create-consumables-assigned.js
20180321060203-create-consumables-purchased.js
20180321060412-create-consumables.js
20180321060639-create-qr.js
20180329054053-create-vendor.js
20180413071945-add-reason-column-to-ticket.js
20180417040202-create-type.js
20180417040828-add-type-to-assets.js
20180419054044-add-email-to-users.js
20180424102523-updating-asset_id.js
20180424122327-remove-serial_number-index.js
20180426054818-added disabled to assets.js
\.


--
-- Data for Name: assets; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.assets (id, asset_id, serial_number, asset_name, purchase_date, description, invoice_number, vendor, amount, gst, total, current_status, category, "createdAt", "updatedAt", condition, location, "assetType", disabled) FROM stdin;
6	6	741	charger	2018-04-14 00:00:00+05:30	charger	536	manisha	896	1	904.960000000000036	Available	Electronics	2018-04-10 15:17:41.857+05:30	2018-04-10 15:17:41.857+05:30	new	kerala	\N	\N
7	7	321	connector	2018-04-27 00:00:00+05:30	connector	562	shivang	542	0	542	Available	Electronics	2018-04-10 15:18:38.586+05:30	2018-04-10 15:18:38.586+05:30	new	kerala	\N	\N
8	8	456	phone	2018-04-26 00:00:00+05:30	phone	753	ramya	9999	5	10498.9500000000007	Available	Electronics	2018-04-10 15:19:30.179+05:30	2018-04-10 15:19:30.179+05:30	old	hyd	\N	\N
9	9	635	projector	2018-04-21 00:00:00+05:30	projector	459	ramya	10000	2	10200	Available	Electronics	2018-04-10 15:20:20.396+05:30	2018-04-10 15:20:20.396+05:30	new	hyd	\N	\N
10	10	412	printer	2018-04-23 00:00:00+05:30	printer	563	ramya	89635	2	91427.6999999999971	Available	Electronics	2018-04-10 15:21:11.94+05:30	2018-04-10 15:21:11.94+05:30	new	hyd	\N	\N
11	11	547	scanner	2018-04-26 00:00:00+05:30	scanner	654	shivang	56321	3	58010.6299999999974	Available	Non-Electronics	2018-04-10 15:22:06.515+05:30	2018-04-10 15:22:06.515+05:30	new	hyd	\N	\N
2	2	789	cable	2018-04-03 00:00:00+05:30	cabel	456	shivang	25000	2	25500	Assigned	Non-Electronics	2018-04-10 15:11:28.834+05:30	2018-04-10 15:25:18.593+05:30	new	hyd	\N	\N
4	4	963	mouse	2018-04-14 00:00:00+05:30	mouse	563	ramya	9634	3	9923.02000000000044	Service	Electronics	2018-04-10 15:13:43.386+05:30	2018-04-10 15:26:05.3+05:30	use	bang	\N	\N
5	5	845	monitors	2018-04-19 00:00:00+05:30	monitors	632	manisha	89653	2	91446.0599999999977	Assigned	Electronics	2018-04-10 15:14:49.103+05:30	2018-04-10 16:14:13.002+05:30	use	bang	\N	\N
12	12	90	Macbook	2018-05-04 00:00:00+05:30	macbook	78	keshav	45000	5	47250	Assigned	Electronics	2018-05-04 10:06:38.934+05:30	2018-05-09 10:55:30.645+05:30	new	hyd	Electronics	\N
3	3	852	desktop	2018-04-12 00:00:00+05:30	desktop	563	keshav	50200	5	52710	Service	Electronics	2018-04-10 15:12:43.07+05:30	2018-05-09 15:06:59.507+05:30	use	bang	\N	\N
13	13	34	Laptop	2018-05-04 00:00:00+05:30	laptop	56	shivang	28000	5	29400	Service	Electronics	2018-05-04 10:12:57.585+05:30	2018-05-09 15:07:34.472+05:30	old	hyd	Electronics	\N
\.


--
-- Data for Name: assets_assigneds; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.assets_assigneds (id, asset_id, user_id, ticket_number, "from", "to", expected_recovery, "createdAt", "updatedAt") FROM stdin;
1	2	005	\N	2018-04-01 00:00:00+05:30	\N	2018-04-12 00:00:00+05:30	2018-04-10 15:25:18.623+05:30	2018-04-10 15:25:18.623+05:30
2	5	001	2	2018-04-10 16:14:13.011+05:30	\N	2018-04-25 00:00:00+05:30	2018-04-10 16:14:13.012+05:30	2018-04-10 16:14:13.012+05:30
3	12	004	\N	2018-05-10 00:00:00+05:30	\N	2018-05-17 00:00:00+05:30	2018-05-09 10:55:30.647+05:30	2018-05-09 10:55:30.647+05:30
\.


--
-- Data for Name: assets_repairs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.assets_repairs (id, asset_id, vendor, "from", "to", expected_delivery, repair_invoice, amount, gst, total, "createdAt", "updatedAt") FROM stdin;
1	4	ramya	2018-04-01 00:00:00+05:30	\N	2018-04-04 00:00:00+05:30	\N	\N	\N	\N	2018-04-10 15:26:05.266+05:30	2018-04-10 15:26:05.266+05:30
2	3	ramya	2018-05-09 00:00:00+05:30	\N	2018-05-10 00:00:00+05:30	\N	\N	\N	\N	2018-05-09 15:06:59.49+05:30	2018-05-09 15:06:59.49+05:30
3	13	shivang	2018-05-09 00:00:00+05:30	\N	2018-05-10 00:00:00+05:30	\N	\N	\N	\N	2018-05-09 15:07:34.461+05:30	2018-05-09 15:07:34.461+05:30
\.


--
-- Data for Name: consumables; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.consumables (id, consumable_id, name, quantity, "createdAt", "updatedAt") FROM stdin;
5	5	Paper	1000	2018-04-10 15:39:06.353+05:30	2018-04-10 15:39:06.353+05:30
6	6	Chart	15	2018-04-10 15:39:28.651+05:30	2018-04-10 15:39:28.651+05:30
9	9	Notepad	100	2018-04-10 15:40:12.649+05:30	2018-04-10 15:40:12.649+05:30
12	12	Balloons	100	2018-04-10 15:41:06.868+05:30	2018-04-10 15:41:06.868+05:30
13	13	Scissors	15	2018-04-10 15:41:23.894+05:30	2018-04-10 15:43:16.969+05:30
7	7	Stapler	15	2018-04-10 15:39:42.71+05:30	2018-04-10 15:43:22.409+05:30
10	10	Marker	15	2018-04-10 15:40:30.466+05:30	2018-04-10 15:43:27.963+05:30
14	14	Cutters	2	2018-05-04 13:10:57.031+05:30	2018-05-04 13:10:57.031+05:30
15	15	Sheets	90	2018-05-04 13:13:25.747+05:30	2018-05-04 13:13:25.747+05:30
8	8	Notebooks	95	2018-04-10 15:39:56.778+05:30	2018-05-07 12:21:54.235+05:30
\.


--
-- Data for Name: consumables_assigneds; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.consumables_assigneds (id, consumable_id, user_id, ticket_number, assigned_date, quantity, "createdAt", "updatedAt") FROM stdin;
1	1	001	\N	2018-04-10 15:44:45.571+05:30	5	2018-04-10 15:44:45.623+05:30	2018-04-10 15:44:45.623+05:30
2	1	001	8	2018-04-10 16:13:56.549+05:30	5	2018-04-10 16:13:56.551+05:30	2018-04-10 16:13:56.551+05:30
3	2	001	7	2018-04-10 16:13:57.447+05:30	2	2018-04-10 16:13:57.447+05:30	2018-04-10 16:13:57.447+05:30
4	3	001	6	2018-04-10 16:13:58.235+05:30	10	2018-04-10 16:13:58.235+05:30	2018-04-10 16:13:58.235+05:30
5	2	001	11	2018-05-04 10:17:01.088+05:30	5	2018-05-04 10:17:01.089+05:30	2018-05-04 10:17:01.089+05:30
6	8	001	5	2018-05-07 12:21:54.227+05:30	5	2018-05-07 12:21:54.228+05:30	2018-05-07 12:21:54.228+05:30
\.


--
-- Data for Name: consumables_purchaseds; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.consumables_purchaseds (id, consumable_id, vendor_name, purchase_date, quantity, item_price, whole_price, discount, gst, total, "createdAt", "updatedAt") FROM stdin;
1	1	keshav	2018-04-12 00:00:00+05:30	56	20	1120	2	1	1108.79999999999995	2018-04-10 15:36:49.754+05:30	2018-04-10 15:36:49.754+05:30
2	2	shivang	2018-04-18 00:00:00+05:30	50	10	500	1	1	500	2018-04-10 15:37:11.524+05:30	2018-04-10 15:37:11.524+05:30
3	3	ramya	2018-04-27 00:00:00+05:30	56	25	1400	0	5	1470	2018-04-10 15:37:49.947+05:30	2018-04-10 15:37:49.947+05:30
4	2	keshav	2018-04-10 00:00:00+05:30	100	1	100	0	0	100	2018-04-10 15:38:18.429+05:30	2018-04-10 15:38:18.429+05:30
5	4	keshav	2018-04-10 00:00:00+05:30	100	2	200	0	0	200	2018-04-10 15:38:52.47+05:30	2018-04-10 15:38:52.47+05:30
6	5	keshav	2018-04-10 00:00:00+05:30	1000	1	1000	0	0	1000	2018-04-10 15:39:06.384+05:30	2018-04-10 15:39:06.384+05:30
7	6	keshav	2018-04-10 00:00:00+05:30	15	15	225	0	0	225	2018-04-10 15:39:28.686+05:30	2018-04-10 15:39:28.686+05:30
8	7	keshav	2018-04-10 00:00:00+05:30	10	60	600	0	0	600	2018-04-10 15:39:42.733+05:30	2018-04-10 15:39:42.733+05:30
9	8	keshav	2018-04-10 00:00:00+05:30	100	35	3500	0	0	3500	2018-04-10 15:39:56.824+05:30	2018-04-10 15:39:56.824+05:30
10	9	keshav	2018-04-10 00:00:00+05:30	100	15	1500	0	0	1500	2018-04-10 15:40:12.76+05:30	2018-04-10 15:40:12.76+05:30
11	10	keshav	2018-04-10 00:00:00+05:30	10	45	450	0	0	450	2018-04-10 15:40:30.499+05:30	2018-04-10 15:40:30.499+05:30
12	11	keshav	2018-04-10 00:00:00+05:30	1000	1	1000	0	0	1000	2018-04-10 15:40:47.031+05:30	2018-04-10 15:40:47.031+05:30
13	12	keshav	2018-04-10 00:00:00+05:30	100	1	100	0	0	100	2018-04-10 15:41:06.931+05:30	2018-04-10 15:41:06.931+05:30
14	13	keshav	2018-04-10 00:00:00+05:30	10	60	600	0	0	600	2018-04-10 15:41:23.924+05:30	2018-04-10 15:41:23.924+05:30
15	3	keshav	2018-05-04 00:00:00+05:30	100	30	3000	4	7	3090	2018-05-04 13:10:00.752+05:30	2018-05-04 13:10:00.752+05:30
16	14	shivang	2018-05-04 00:00:00+05:30	2	200	400	2	3	404	2018-05-04 13:10:57.041+05:30	2018-05-04 13:10:57.041+05:30
17	15	shivang	2018-05-04 00:00:00+05:30	90	45	4050	3	2	4009.5	2018-05-04 13:13:25.755+05:30	2018-05-04 13:13:25.755+05:30
\.


--
-- Data for Name: qrs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.qrs (id, asset_id, qr_code_link, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: tickets; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tickets (id, user_id, ticket_number, date, requested_asset_id, requested_asset_item, requested_consumable_id, requested_consumable_item, item_type, quantity, department, status, "createdAt", "updatedAt", reason) FROM stdin;
1	001	1	2018-04-10 16:02:49.385+05:30	11	scanner	\N	\N	assets	1	HR/Admin	Pending	2018-04-10 16:02:49.407+05:30	2018-04-10 16:02:49.407+05:30	\N
4	001	4	2018-04-10 16:06:40.445+05:30	10	printer	\N	\N	assets	1	HR/Admin	Pending	2018-04-10 16:06:40.485+05:30	2018-04-10 16:06:40.485+05:30	\N
2	001	2	2018-04-10 16:04:36.996+05:30	5	monitors	\N	\N	assets	1	HR/Admin	Accepted	2018-04-10 16:04:37.027+05:30	2018-04-10 16:14:12.971+05:30	\N
3	001	3	2018-04-10 16:06:18.542+05:30	6	charger	\N	\N	assets	1	HR/Admin	Rejected	2018-04-10 16:06:18.568+05:30	2018-05-07 10:34:50.172+05:30	you have been given this
\.


--
-- Data for Name: types; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.types (id, "assetType", "maxRequest", "createdAt", "updatedAt") FROM stdin;
1	Electronics	1	2018-05-04 10:06:32.944+05:30	2018-05-04 10:06:32.944+05:30
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, user_id, first_name, last_name, age, gender, password, role, token, department, designation, "createdAt", "updatedAt", email) FROM stdin;
35	111	Rahul	S	30	Male	$argon2d$v=19$m=4096,t=3,p=1$2Dqoy8qyM2TXx0fzuA9whA$MB/n/F7cRw29iLDm5rpgjY1OrVnB/y0QekPN0lLU7+A	Employee	\N	Delivery	Sr.Project Manager	2018-05-07 09:42:04.542+05:30	2018-05-07 09:46:39.991+05:30	\N
13	001	Veena	Devi	20	Female	$argon2i$v=19$m=4096,t=3,p=1$EnqLzzZYMvaBqZPvd0apBw$65Vr0WQhm3By4s/u0d/cHWbSf/tTyrsSJLxEjdjcsZg	Employee	\N	Developer/Designer	Software Development Engineer	2018-05-07 13:09:55.236+05:30	2018-05-09 15:38:22.501+05:30	m.veena2k14@gmail.com
28	004	Manisha	Reddy	22	Female	$argon2d$v=19$m=4096,t=3,p=1$f+LN0SlPMh9B2Zgp84y0TQ$QB6Ebud1c8+fOpLAAiM7oIChHU9gCycc1gSwb+Ekg8U	Employee	\N	Finance/Accounting	Finance director	2018-05-04 17:52:05.248+05:30	2018-05-04 17:52:05.248+05:30	\N
16	112	Shreya	M	30	Female	$argon2d$v=19$m=4096,t=3,p=1$Wut7Ojy62hURukikvfxSqQ$TCO64txUH3dCBNVJPFQkZc1vCMLElTgwoF02PObJTyw	Employee	\N	Delivery	Delivery Manager	2018-05-04 11:39:38.693+05:30	2018-05-07 09:23:31.555+05:30	\N
31	007	Shivang	A	22	Male	$argon2d$v=19$m=4096,t=3,p=1$nVZMmMnM/Gbw85/aAZyVOg$bx59K6/Tod4Y8dK57clRLtIQaV7txZv2UP2kUDkkxEo	Employee	\N	Testing	QA Lead	2018-05-04 17:53:07.837+05:30	2018-05-07 09:24:24.059+05:30	\N
1	Admin	\N	\N	\N	\N	$argon2i$v=19$m=4096,t=3,p=1$wXfH2Oug0fT0m32MaAhU+g$pVya0dVufNgtAmlQt9DkxL6zcaKmagKUW6l12Bj4FEQ	Admin	{eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiQWRtaW4iLCJpYXQiOjE1MjU4NjA1MDd9.q7cIuVRJMPOgRa7sv9ryd9lf6S9PIXOK-NrQywI6VmE}	\N	\N	\N	2018-05-09 15:38:27.816+05:30	\N
26	002	Ghthj	Rgfec	40	Male	$argon2d$v=19$m=4096,t=3,p=1$BzZk9nZBgXXm5Vl5jgU87A$5DDx3iupG6+AbqPUia1Su4w+Lu7gFGnp/5uZTrhfBFk	Employee	\N	Hr	Sr.HR Manager	2018-05-04 15:42:43.278+05:30	2018-05-07 09:25:03.445+05:30	\N
30	006	Keshav	B	22	Male	$argon2d$v=19$m=4096,t=3,p=1$xAuHskYb/xxTdzXauTDKkA$stfPNWcuE5yWRkrqNBMBAbJMy10fxRyCit8iz6/i+9Y	Employee	\N	Delivery	Sr.Project Manager	2018-05-04 17:52:44.843+05:30	2018-05-07 09:25:14.953+05:30	\N
32	008	Manu	Cb	22	Male	$argon2d$v=19$m=4096,t=3,p=1$CykvUGJYsOtZ3OWJLt85gg$wwEBEdHAxMF5XiiXzCOeBtMijqjJaDSonhwLENoWcAk	Employee	\N	HR	Sr.hr manager	2018-05-07 09:32:45.34+05:30	2018-05-07 09:32:45.34+05:30	\N
33	009	Ram	K	23	Male	$argon2d$v=19$m=4096,t=3,p=1$04SKmA5mbce4xI0qttqrIw$r1OgPoY252IQH+s9nN2JwzBnzt43R204HDyHR7ZgtOg	Employee	\N	HR	Hr recruitment manager	2018-05-07 09:39:27.599+05:30	2018-05-07 09:39:27.599+05:30	\N
34	110	Rahim	M	34	Male	$argon2d$v=19$m=4096,t=3,p=1$BrLiV02RjZqBpn1hbmoMAg$PJk5KZRyldqHglZUEzcKv2SIWBJXOpFzDGf6mc/KG3E	Employee	\N	HR	Sr.hr manager	2018-05-07 09:40:38.787+05:30	2018-05-07 09:40:38.787+05:30	\N
27	003	Ramya	Ramesh	20	Female	$argon2d$v=19$m=4096,t=3,p=1$ljNTQY9G7cLooDL2M0T6Dw$YSuKVkEc+uzPxRerRonQBV/HqSnizxkDdG03/wxZpzY	Employee	\N	Delivery	Sr.Project Manager	2018-05-04 17:51:44.188+05:30	2018-05-07 09:41:40.257+05:30	\N
29	005	Nishanth	P	22	Male	$argon2d$v=19$m=4096,t=3,p=1$5gj+O+5yXD7b+6aEJ4vv3g$fHlKq9Ogc2HITzbI9iO3CaHOZhxZdSkvgygh5vBMnYs	Employee	\N	Pre sales	Lead Presales	2018-05-04 17:52:27.431+05:30	2018-05-07 09:46:22.384+05:30	\N
\.


--
-- Data for Name: vendors; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.vendors (id, name, address, contact, "createdAt", "updatedAt") FROM stdin;
1	keshav	dxtuvyinl	7894561230	2018-04-10 15:08:05.685+05:30	2018-04-10 15:08:05.685+05:30
2	shivang	shivangaland	8523697410	2018-04-10 15:09:32.946+05:30	2018-04-10 15:09:32.946+05:30
3	ramya	kondapur	9632587410	2018-04-10 15:13:05.519+05:30	2018-04-10 15:13:05.519+05:30
4	manisha	hyderabad	7965412380	2018-04-10 15:14:05.316+05:30	2018-04-10 15:14:05.316+05:30
\.


--
-- Name: assets_asset_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.assets_asset_id_seq', 11, true);


--
-- Name: assets_assigneds_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.assets_assigneds_id_seq', 2, true);


--
-- Name: assets_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.assets_id_seq', 11, true);


--
-- Name: assets_repairs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.assets_repairs_id_seq', 1, true);


--
-- Name: consumables_assigneds_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.consumables_assigneds_id_seq', 4, true);


--
-- Name: consumables_consumable_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.consumables_consumable_id_seq', 13, true);


--
-- Name: consumables_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.consumables_id_seq', 13, true);


--
-- Name: consumables_purchaseds_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.consumables_purchaseds_id_seq', 14, true);


--
-- Name: qrs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.qrs_id_seq', 1, false);


--
-- Name: tickets_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tickets_id_seq', 12, true);


--
-- Name: tickets_ticket_number_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tickets_ticket_number_seq', 12, true);


--
-- Name: types_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.types_id_seq', 1, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 12, true);


--
-- Name: vendors_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.vendors_id_seq', 4, true);


--
-- Name: SequelizeMeta SequelizeMeta_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SequelizeMeta"
    ADD CONSTRAINT "SequelizeMeta_pkey" PRIMARY KEY (name);


--
-- Name: assets_assigneds assets_assigneds_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.assets_assigneds
    ADD CONSTRAINT assets_assigneds_pkey PRIMARY KEY (id);


--
-- Name: assets assets_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.assets
    ADD CONSTRAINT assets_pkey PRIMARY KEY (asset_id);


--
-- Name: assets_repairs assets_repairs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.assets_repairs
    ADD CONSTRAINT assets_repairs_pkey PRIMARY KEY (id);


--
-- Name: assets assets_serial_number_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.assets
    ADD CONSTRAINT assets_serial_number_key UNIQUE (serial_number);


--
-- Name: consumables_assigneds consumables_assigneds_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.consumables_assigneds
    ADD CONSTRAINT consumables_assigneds_pkey PRIMARY KEY (id);


--
-- Name: consumables consumables_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.consumables
    ADD CONSTRAINT consumables_pkey PRIMARY KEY (consumable_id);


--
-- Name: consumables_purchaseds consumables_purchaseds_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.consumables_purchaseds
    ADD CONSTRAINT consumables_purchaseds_pkey PRIMARY KEY (id);


--
-- Name: qrs qrs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.qrs
    ADD CONSTRAINT qrs_pkey PRIMARY KEY (id);


--
-- Name: tickets tickets_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tickets
    ADD CONSTRAINT tickets_pkey PRIMARY KEY (ticket_number);


--
-- Name: types types_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.types
    ADD CONSTRAINT types_pkey PRIMARY KEY ("assetType");


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- Name: vendors vendors_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vendors
    ADD CONSTRAINT vendors_pkey PRIMARY KEY (id);


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: veenadevi
--

GRANT ALL ON SCHEMA public TO postgres;


--
-- PostgreSQL database dump complete
--

