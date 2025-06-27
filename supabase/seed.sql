insert into "public"."roles" (name) values ('admin'),('public');

-- insert into "public"."category" (name) values ('turismo'),('restaurantes'),('hoteles'),('transporte');
insert into "public"."category" (name) values ('Gastronomía');
insert into "public"."category" (name) values ('Agencias de viajes');
insert into "public"."category" (name) values ('hoteles');
insert into "public"."category" (name) values ('Bienestar');
insert into "public"."category" (name) values ('Poblados');

insert into "public"."type_activity" (name) values ('Operador');
insert into "public"."type_activity" (name) values ('poblados');
insert into "public"."type_activity" (name) values ('guia');

insert into  "public"."zone" (name) 
values 
('Centro Poblado Guamal'),
('Centro Poblado Santa Teresa'),
('Centro Poblado Horizontes'),
('Centro Poblado La Mesa'),
('Centro Poblado San Carlos del Guavio'),
('Dentro Pueblo');

INSERT INTO "public"."operator" (
    "name",
    "name_company",
    "description",
    "phone",
    "lat",
    "lng",
    "type_activity",
    "category_id",
    "zone_id",
    "direction"
) VALUES 
(
    'Henry Holguín',
    'Artesanal Fast Food',
    '¡Deleitamos tu paladar con cada bocado! Encontrarás mucho más que sabor: vivirás una experiencia única que combina ingredientes frescos, preparación al instante y un servicio que te hace sentir como en casa. Desde hamburguesas jugosas hasta papas crujientes y salsas irresistibles, cada receta está pensada para deleitar tu paladar y dejarte con ganas de volver.',
    '3125486197',
    4.820258,
    -73.167651,
    1,
    1,
    6,
    'Cra 3 # 5-10'
),
(
    'Andrés Vanegas ',
    'Café Bar  DYLAN.@RTVS',
    'Café Bar DYLAN.@RTVS es un lugar donde la cultura y la gastronomía se fusionan para crear un ambiente único y agradable. Con un diseño moderno y acogedor, ofrecemos una experiencia que combina la comodidad de casa con la atmósfera de un lugar especial. Nuestro menú varía según la temporada, pero siempre incluye opciones que reflejan la diversidad de sabores y culturas que nos rodean. Desde platos tradicionales hasta innovaciones creativas, cada bocado es una invitación a disfrutar de la belleza de la cocina y la belleza de la vida.  Platos: Churros, migao, Avenas, bebidas, colaciones, helados ',
    '3174515132',
    4.820106,
    -3.168754,
    1,
    1,
    6,
    'Cra 4 # 4-27'
),
(
    'Neyer Perilla',
    'Variedades y Antojitos Gael ',
    'Variedades y Antojitos Gael es un lugar donde la cultura y la gastronomía se fusionan para crear un ambiente único y agradable. Con un diseño moderno y acogedor, ofrecemos una experiencia que combina la comodidad de casa con la atmósfera de un lugar especial. Nuestro menú varía según la temporada, pero siempre incluye opciones que reflejan la diversidad de sabores y culturas que nos rodean. Desde platos tradicionales hasta innovaciones creativas, cada bocado es una invitación a disfrutar de la belleza de la cocina y la belleza de la vida.  Platos: Comida rápida natural, empanadas, arepas, hamburguesas ',
    '3158966203',
    4.820495,
    -73.168515,
    1,
    1,
    6,
    'Cra 4 # 4-60'
),
(
    'Julia Mora',
    'Punto Rico',
    'Punto Rico es un lugar donde la cultura y la gastronomía se fusionan para crear un ambiente único y agradable. Con un diseño moderno y acogedor, ofrecemos una experiencia que combina la comodidad de casa con la atmósfera de un lugar especial. Nuestro menú varía según la temporada, pero siempre incluye opciones que reflejan la diversidad de sabores y culturas que nos rodean. Desde platos tradicionales hasta innovaciones creativas, cada bocado es una invitación a disfrutar de la belleza de la cocina y la belleza de la vida.  Platos: Bebidas, granizados, picadas, pago de servicios públicos ',
    '3212131084',
    4.820501,
    -73.168326,
    1,
    1,
    6,
    'Cra 4 # 4-60'
),
(
    'Alexander Quiroga',
    'Hotel La Terraza',
    'Hotel La Terraza, Ambiente Familiar y cómodo',
    '3124951833',
    4.820220,
    -73.168681,
    1,
    3,
    6,
    'Cra 4 # 4-24'
),
(
    'LILIANA CARO',
    'Hotel Buenos Aires',
    'Hotel Buenos Aires, Ambiente Familiar y cómodo, excelente servicio',
    '3114542274',
    4.820207,
    -73.168624,
    1,
    3,
    6,
    'CRA 4 # 4-36'
);




-- datos nuevos

INSERT INTO "public"."operator" (
    "name",
    "name_company",
    "description",
    "phone",
    "lat",
    "lng",
    "type_activity",
    "category_id",
    "zone_id",
    "direction"
) VALUES 
(
    'Claudia Lesmes',
    'Hotel Real Blue',
    'Hotel Real Blue, Ambiente Familiar y cómodo',
    '3118366937',
    4.8190749,
    -73.170982,
    1,
    3,
    6,
    'Cra 3 # 3-40'
);

INSERT INTO "public"."operator" (
    "name",
    "name_company",
    "description",
    "phone",
    "lat",
    "lng",
    "type_activity",
    "category_id",
    "zone_id",
    "direction"
) VALUES 
(
    'Marcela Sánchez',
    'Hotel Colina Campestre Sede A',
    'Hotel Colina Campestre Sede A, Ambiente Familiar y cómodo',
    '3118366937',
    4.8208697,
    -73.1745167,
    1,
    3,
    6,
    'Cra 4 # 5-04'
);

INSERT INTO "public"."operator" (
    "name",
    "name_company",
    "description",
    "phone",
    "lat",
    "lng",
    "type_activity",
    "category_id",
    "zone_id",
    "direction"
) VALUES 
(
    'Camilo Holguin',
    'Quintas Harmony Glamping',
    'Quintas Harmony Glamping, Contamos con un sendero ecológico y aliados en el sector para ofrecer diversas actividades. Continúa navegando o contáctanos para más información. Nos complace ofrecerte una piscina al aire libre con cascada y rodeada de naturaleza. Tu felicidad es nuestra prioridad y esperamos que disfrutes tu estadía.',
    '3153731041',
    4.8199632,
    -73.1762216,
    1,
    3,
    6,
    'Cra 4 # 6-38'
);

-- !!! Poblados !!!

-- Guamal 

INSERT INTO "public"."operator" (
    "name",
    "name_company",
    "description",
    "phone",
    "lat",
    "lng",
    "type_activity",
    "category_id",
    "zone_id",
    "direction"
) VALUES 
(
    'IGLESIA CENTRO POBLADO GUAMAL',
    'Iglesia Centro Poblado Guamal',
    'En el corazón del centro poblado de Guamal, jurisdicción del municipio de San Luis de Gaceno, se alza la iglesia central, un espacio que representa la identidad espiritual y cultural de sus habitantes. Este templo, construido con arquitectura sencilla pero significativa, ha sido punto de encuentro para la comunidad durante generaciones, albergando misas, celebraciones patronales y actos comunitarios que fortalecen los lazos del territorio.
Rodeada de montañas y paisajes rurales, la iglesia no solo es un lugar de oración, sino también un sitio de historia viva, donde se conserva el sentido de pertenencia y se comparten los valores tradicionales del piedemonte boyacense',
    '3153731041',
    4.747816,
    -73.146834,
    2,
    5,
    1,
    ''
);

INSERT INTO "public"."operator" (
    "name",
    "name_company",
    "description",
    "phone",
    "lat",
    "lng",
    "type_activity",
    "category_id",
    "zone_id",
    "direction"
) VALUES 
(
    'SEGUNDA PERSONA MAS LONGEVA DE BOYACÁ',
    'SEGUNDA PERSONA MAS LONGEVA DE BOYACÁ',
    'En el cálido y fértil territorio de San Luis de Gaceno, vive una figura emblemática que ha sido testigo de más de un siglo de historia: Pompo, reconocido como la segunda persona más longeva del departamento de Boyacá. Con más de cien años de vida, Pompo representa la esencia del campesino boyacense: trabajador, sabio, cercano a la tierra y profundo conocedor de las costumbres ancestrales.
Quienes tienen la fortuna de conocerlo, descubren en sus palabras un testimonio vivo del pasado, desde tiempos de arriería y trueque hasta la transformación del campo y la llegada del progreso. Pompo no solo es memoria viva del municipio, sino también un símbolo de respeto, resiliencia y amor por las raíces',
    '3111111111',
    4.747816,
    -73.14683,
    2,
    5,
    1,
    ''
);

-- horizontes

INSERT INTO "public"."operator" (
    "name",
    "name_company",
    "description",
    "phone",
    "lat",
    "lng",
    "type_activity",
    "category_id",
    "zone_id",
    "direction"
) VALUES 
(
    'IGLESIA CENTRO POBLADO HORIZONTES',
    'IGLESIA CENTRO POBLADO HORIZONTES',
    'En el corazón del centro poblado Horizontes, se alza un símbolo de identidad y espiritualidad para sus habitantes: la iglesia central. Más que un lugar de culto, este templo representa un punto de encuentro para la comunidad, un espacio donde convergen la fe, la tradición y el sentido de pertenencia.
Construida con esfuerzo colectivo y mantenida con esmero a lo largo del tiempo, la iglesia de Horizontes ha sido testigo de generaciones que han celebrado allí sus momentos más significativos: bautizos, matrimonios, misas campesinas y festividades religiosas que llenan de vida y esperanza este rincón del municipio.
Cada detalle de su arquitectura, desde los bancos de madera hasta su altar principal, guarda historias compartidas y rezos comunitarios. Es un lugar que invita al recogimiento, al encuentro con lo sagrado, y a fortalecer los lazos entre vecinos y familias',
    '3111111111',
    4.724203,
    -73.137818,
    2,
    5,
    3,
    ''
);

INSERT INTO "public"."operator" (
    "name",
    "name_company",
    "description",
    "phone",
    "lat",
    "lng",
    "type_activity",
    "category_id",
    "zone_id",
    "direction"
) VALUES 
(
    'MIRADOR DE LA VIRGEN',
    'MIRADOR DE LA VIRGEN',
    'Ubicado en el centro poblado Horizontes, este mirador natural se ha convertido en un punto imperdible para quienes buscan una conexión auténtica con la belleza de San Luis de Gaceno. Desde lo alto, el Mirador de la virgen ofrece una vista panorámica que abarca verdes montañas, caminos rurales y el fluir del río que bordea la región. Es un lugar que invita a detenerse, contemplar y respirar profundamente.
Más que un atractivo visual, este mirador es un espacio de encuentro entre habitantes y visitantes, un rincón tranquilo donde se celebran amaneceres, se comparten historias y se reflexiona al atardecer. Quienes lo visitan coinciden en que allí se experimenta una sensación de paz, admiración por la naturaleza y orgullo por el territorio.
El mirador ha sido acondicionado por la comunidad para ofrecer una experiencia segura y acogedora. Su acceso es sencillo, y su cercanía con la iglesia y el corazón del centro poblado lo convierte en una parada ideal para quienes recorren la zona',
    '3111111111',
    4.724203,
    -73.137818,
    2,
    5,
    3,
    ''
);

-- SANTA Carlos de guavio

INSERT INTO "public"."operator" (
    "name",
    "name_company",
    "description",
    "phone",
    "lat",
    "lng",
    "type_activity",
    "category_id",
    "zone_id",
    "direction"
) VALUES 
(
    'IGLESIA CENTRO POBLADO SAN CARLOS DEL GUAVIO',
    'IGLESIA CENTRO POBLADO SAN CARLOS DEL GUAVIO',
    'En medio de los paisajes verdes y montañosos del oriente boyacense, se alza con sencillez y belleza la Iglesia San Carlos del Guavio, uno de los símbolos más representativos de este centro poblado. Su fachada sobria y su interior cálido reflejan la fe y el compromiso de una comunidad que ha encontrado en este templo un punto de unión, tradición y esperanza.
Esta iglesia no solo cumple una función religiosa, sino que también representa la identidad cultural del territorio. Ha sido testigo de generaciones que han celebrado allí sus momentos más importantes: bautizos, primeras comuniones, matrimonios y misas en memoria de sus seres queridos. Cada rincón del templo guarda historias que hablan de la fuerza espiritual de San Carlos del Guavio y de la importancia de conservar sus raíces.
El templo se convierte también en un atractivo para visitantes que desean conocer la arquitectura vernácula, participar en celebraciones locales o simplemente disfrutar del ambiente sereno que rodea este lugar sagrado.',
    '3111111111',
    4.75170,
    -73.06555,
    2,
    5,
    5,
    ''
);

INSERT INTO "public"."operator" (
    "name",
    "name_company",
    "description",
    "phone",
    "lat",
    "lng",
    "type_activity",
    "category_id",
    "zone_id",
    "direction"
) VALUES 
(
    'MIRADOR DE LAS CURVAS',
    'MIRADOR DE LAS CURVAS',
    'A pocos minutos del centro poblado San Carlos del Guavio, se encuentra el Mirador Las Curvas, un punto elevado desde donde se despliega una de las vistas más impactantes del paisaje guaviano. Rodeado de montañas, cafetales y caminos serpenteantes que le dan su nombre, este lugar es un verdadero balcón natural hacia la belleza de la región.
Desde este mirador se puede contemplar el contraste entre la geografía montañosa y la serenidad de los cultivos que adornan las laderas. Es un lugar ideal para detenerse, respirar aire puro, y dejarse cautivar por el ritmo tranquilo del campo boyacense. Al amanecer o al caer la tarde, el paisaje se transforma en un espectáculo de luces y sombras, digno de ser contemplado en silencio.
El Mirador Las Curvas es también punto de encuentro para caminantes, viajeros y habitantes locales que valoran este rincón como parte del patrimonio paisajístico de su comunidad. Su acceso es fácil y se puede llegar a pie o en vehículo, lo que lo convierte en una parada recomendada para quienes visitan San Carlos del Guavio',
    '3111111111',
    4.768212,
    -73.080691,
    2,
    5,
    5,
    ''
);

-- La Mesa

INSERT INTO "public"."operator" (
    "name",
    "name_company",
    "description",
    "phone",
    "lat",
    "lng",
    "type_activity",
    "category_id",
    "zone_id",
    "direction"
) VALUES 
(
    'IGLESIA CENTRO POBLADO LA MESA',
    'IGLESIA CENTRO POBLADO LA MESA',
    'En el centro del pintoresco poblado de La Mesa, se levanta con humildad y belleza la iglesia principal, un lugar sagrado que ha sido testigo de la vida espiritual y comunitaria de sus habitantes durante generaciones. Enmarcada por montañas y rodeada del verdor característico de la región, esta iglesia representa la unión entre la fe, la historia y la identidad cultural del territorio.
La Iglesia de La Mesa es más que un templo; es el alma de la comunidad. Allí se celebran los momentos más significativos del calendario religioso, así como los hitos personales de quienes habitan en este rincón boyacense: bautizos, matrimonios, misas campesinas y festividades que llenan de música, oración y tradición cada rincón del poblado.
Su arquitectura, modesta pero cargada de simbolismo, refleja el esfuerzo colectivo de una comunidad profundamente creyente. Al ingresar, se percibe un ambiente de paz y recogimiento que invita a la reflexión y al agradecimiento.',
    '3111111111',
    4.804901,
    -73.090213,
    2,
    5,
    4,
    ''
);

INSERT INTO "public"."operator" (
    "name",
    "name_company",
    "description",
    "phone",
    "lat",
    "lng",
    "type_activity",
    "category_id",
    "zone_id",
    "direction"
) VALUES 
(
    'MIRADOR DE LA MESA',
    'MIRADOR DE LA MESA',
    'En las alturas del centro poblado La Mesa, se encuentra un lugar que regala una de las vistas más hermosas del oriente boyacense: el Mirador La Mesa. Desde este punto estratégico, el visitante puede contemplar un amplio paisaje de montañas, senderos rurales, ríos y cultivos que forman parte del alma campesina de la región.
El Mirador La Mesa es un espacio privilegiado para conectarse con la naturaleza, respirar aire puro y dejarse envolver por la tranquilidad del entorno. Su nombre hace honor a la geografía plana sobre la que se asienta el poblado, contrastando con las ondulaciones de las montañas que lo rodean y que se aprecian en todo su esplendor desde este lugar.
Frecuentado por habitantes locales y viajeros que desean descubrir los tesoros escondidos de San Luis de Gaceno, este mirador es ideal para observar aves, disfrutar del amanecer o simplemente contemplar la grandeza del paisaje boyacense.',
    '3111111111',
    4.804369,
    -73.096881,
    2,
    5,
    4,
    ''
);

-- San teresa



INSERT INTO "public"."operator" (
    "name",
    "name_company",
    "description",
    "phone",
    "lat",
    "lng",
    "type_activity",
    "category_id",
    "zone_id",
    "direction"
) VALUES 
(
    'IGLESIA CENTRO POBLADO SANTA TERESA',
    'IGLESIA CENTRO POBLADO SANTA TERESA',
    '',
    '3111111111',
    4.924386,
    -73.085889,
    2,
    5,
    2,
    ''
);