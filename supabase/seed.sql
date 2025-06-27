insert into "public"."roles" (name) values ('admin'),('public');

-- insert into "public"."category" (name) values ('turismo'),('restaurantes'),('hoteles'),('transporte');
insert into "public"."category" (name) values ('Gastronomía');
insert into "public"."category" (name) values ('Agencias de viajes');
insert into "public"."category" (name) values ('hoteles');
insert into "public"."category" (name) values ('Bienestar');

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
    '3212095827',
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




