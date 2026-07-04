-- Mostrar todos los libros publicados después del año 2022.
db["libros"].find({año:{$gte:2022}})
-- Mostrar los usuarios cuya edad sea mayor o igual a 21 años.
db["libros"].find({año:{$gte:2022}})
-- Mostrar los libros con menos de 350 páginas.
db["libros"].find({paginas:{$lt:350}})
-- Mostrar los usuarios cuya edad sea menor o igual a 20 años.
db["usuarios"].find({edad:{$lte:20}})
-- Mostrar los libros cuya categoría sea diferente de "Programación".
db["libros"].find({categoria:{$ne:"Programacion"}})
-- Mostrar los usuarios que estudien Ingeniería Informática y estén en sexto semestre o superior.
db["usuarios"].find({$and:[{carrera:"Ingenieria Informatica"}, {semestre:{gte:6}}]})
-- Mostrar los libros cuya categoría sea Programación o Bases de Datos.
db["libros"].find({$or: [{categoria:"Programacion"},{categoria:"Base de datos"}]})
-- Mostrar los préstamos que no han sido devueltos y cuya duración sea mayor a 8 días.
db["libros"].find({$or: [{categoria:"Programacion"},{categoria:"Base de datos"}]})
--Mostrar los libros cuyo título empiece con la letra M.
db["libros"].find({titulo:/^M/})
--Mostrar los usuarios cuyo nombre empiece con la letra A.
db["libros"].find({titulo:/^A/})
--Mostrar los libros cuyo título contenga la palabra "Base".
db["libros"].find({titulo:/Base/})
--Mostrar únicamente el nombre y la carrera de todos los usuarios.
db["usuarios"].find({},{nombre:1,carrera:1,_id:0})
--Mostrar únicamente el título y el autor de todos los libros.
db["libros"].find({},{titulo:1,autor:1,_id:0})
--Mostrar únicamente el usuario y el libro de todos los préstamos.
db["prestamos"].find({},{usuario:1,libro:1,_id:0})
--Mostrar los libros ordenados por año de publicación, del más reciente al más antiguo.
db["libros"].find().sort({año:-1})
--Mostrar los usuarios ordenados alfabéticamente por nombre.
db["usuarios"].find().sort({nombre:1})
--Mostrar los préstamos ordenados por la cantidad de días de préstamo, del mayor al menor.
db["prestamos"].find().sort({diasPrestamo:-1})
--Mostrar únicamente el título y el año de los libros publicados a partir de 2022, ordenados del más reciente al más 
antiguo.
db["libros"].find({año:{$gte:2022}},{titulo:1,año:1,_id:0}).sort({año:-1})
--Mostrar el nombre y la carrera de los usuarios cuya carrera sea Ingeniería en Sistemas Computacionales o 
Ingeniería Informática.
db["usuarios"].find({$or:[{carrera:"Ingenieria en Sistemas Computacionales"},{carrera:"Ingenieria Informatica"}]},{nombre:1,carrera:1,_id:0})
--Mostrar los préstamos no devueltos, ordenados por la cantidad de días de préstamo de mayor a menor, mostrando 
únicamente el usuario, el libro y los días de préstamo.
db["prestamos"].find({devuelto:false},{usuario:1,libro:1,diasPrestamo:1,_id:0}).sort({diasPrestamo:-1})
