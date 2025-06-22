insert into "public"."roles" (name) values ('admin'),('public');

-- insert into "public"."category" (name) values ('turismo'),('restaurantes'),('hoteles'),('transporte');
insert into "public"."category" (name) values ('Gastronomía');
insert into "public"."category" (name) values ('Agencias de viajes');
insert into "public"."category" (name) values ('Variedades');
insert into "public"."category" (name) values ('Bienestar');

insert into  "public"."zone" (name) values ('Centro Poblado Horizontes'),('Centro Poblado Guamal'),('Centro Poblado San Carlos'),('Centro Poblado La Mesa'),('Centro Poblado Santa Tereza');

INSERT INTO "public"."operator" (
    "name",
    "name_company",
    "description",
    "phone",
    "lat",
    "lng",
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
    'Cra 3 # 5-10'
),
(
    'Henry Holguín',
    'Viajeros del Llano',
    'Tus mejores momentos suéñalos, viajeros te los hace realidad',
    '3125486197',
    4.820258,
    -73.167651,
    2,
    2,
    ''
),
(
    'Cecilia Astroz',
    'Skinny',
    '',
    '3208393466',
    4.820984,
    -73.167582,
    3,
    3,
    'Cl 6 # 3-24'
);



