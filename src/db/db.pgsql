
CREATE TABLE public.code (
    id integer NOT NULL,
    code text,
    is_deleted boolean DEFAULT false,
    id_user integer NOT NULL,
    name text
);

ALTER TABLE public.code OWNER TO postgres;

CREATE SEQUENCE public.code_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE public.code_id_seq OWNER TO postgres;

ALTER SEQUENCE public.code_id_seq OWNED BY public.code.id;

CREATE SEQUENCE public.code_id_user_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.code_id_user_seq OWNER TO postgres;

--
-- Name: code_id_user_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.code_id_user_seq OWNED BY public.code.id_user;


--
-- Name: config; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.config (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    value boolean DEFAULT false
);


ALTER TABLE public.config OWNER TO postgres;

--
-- Name: config_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.config_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.config_id_seq OWNER TO postgres;

--
-- Name: config_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.config_id_seq OWNED BY public.config.id;


--
-- Name: hash_algorithms; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.hash_algorithms (
    id integer NOT NULL,
    name character varying(255)
);


ALTER TABLE public.hash_algorithms OWNER TO postgres;

--
-- Name: hash_algorithms_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.hash_algorithms_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.hash_algorithms_id_seq OWNER TO postgres;

--
-- Name: hash_algorithms_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.hash_algorithms_id_seq OWNED BY public.hash_algorithms.id;


--
-- Name: roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.roles (
    id integer NOT NULL,
    role character varying(255) NOT NULL
);


ALTER TABLE public.roles OWNER TO postgres;

--
-- Name: roles_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.roles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.roles_id_seq OWNER TO postgres;

--
-- Name: roles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.roles_id_seq OWNED BY public.roles.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    email character varying(255),
    is_blocked boolean DEFAULT false,
    is_deleted boolean DEFAULT false,
    role integer NOT NULL,
    pass character varying(255),
    salt character varying(4),
    count_hash integer NOT NULL,
    alg integer NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_alg_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_alg_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_alg_seq OWNER TO postgres;

--
-- Name: users_alg_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_alg_seq OWNED BY public.users.alg;


--
-- Name: users_count_hash_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_count_hash_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_count_hash_seq OWNER TO postgres;

--
-- Name: users_count_hash_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_count_hash_seq OWNED BY public.users.count_hash;


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
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
-- Name: users_role_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_role_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_role_seq OWNER TO postgres;

--
-- Name: users_role_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_role_seq OWNED BY public.users.role;


--
-- Name: code id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.code ALTER COLUMN id SET DEFAULT nextval('public.code_id_seq'::regclass);


--
-- Name: code id_user; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.code ALTER COLUMN id_user SET DEFAULT nextval('public.code_id_user_seq'::regclass);


--
-- Name: config id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.config ALTER COLUMN id SET DEFAULT nextval('public.config_id_seq'::regclass);


--
-- Name: hash_algorithms id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hash_algorithms ALTER COLUMN id SET DEFAULT nextval('public.hash_algorithms_id_seq'::regclass);

--
-- Name: roles id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles ALTER COLUMN id SET DEFAULT nextval('public.roles_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Name: users role; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN role SET DEFAULT nextval('public.users_role_seq'::regclass);


--
-- Name: users count_hash; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN count_hash SET DEFAULT nextval('public.users_count_hash_seq'::regclass);


--
-- Name: users alg; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN alg SET DEFAULT nextval('public.users_alg_seq'::regclass);

ALTER TABLE ONLY public.code
    ADD CONSTRAINT code_pkey PRIMARY KEY (id);

--
-- Name: config config_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.config
    ADD CONSTRAINT config_pkey PRIMARY KEY (id);


--
-- Name: hash_algorithms hash_algorithms_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hash_algorithms
    ADD CONSTRAINT hash_algorithms_pkey PRIMARY KEY (id);


--
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: code code_id_user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.code
    ADD CONSTRAINT code_id_user_fkey FOREIGN KEY (id_user) REFERENCES public.users(id);


--
-- Name: users users_alg_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_alg_fkey FOREIGN KEY (alg) REFERENCES public.hash_algorithms(id);


--
-- Name: users users_role_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_role_fkey FOREIGN KEY (role) REFERENCES public.roles(id);


--
-- PostgreSQL database dump complete
--

INSERT INTO roles (role) VALUES ('admin');
INSERT INTO roles (role) VALUES ('user');

ALTER TABLE hash_algorithms ADD keylen integer;
INSERT INTO hash_algorithms (name, keylen) VALUES ('sha256', 32);

INSERT INTO users (email, is_blocked, is_deleted, role, pass, salt, count_hash, alg) VALUES ('sergey.ampo@gmail.com', false, false, 1, '026ef2807d1da8e408e742476557cc56f629dcdbc4f6c420910fc7498a841bd0', '.ggs', 3, 1);
