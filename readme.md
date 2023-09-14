en el index genero la creación del server con express definiendole el puerto traido del .env usando la funciona nativa de "config" de dotenv y lo guardo en la variable "port" uso app.use para definirle que estoy manejando datos json y por ultimo app.use para usar la ruta que tienen mis endpoints y le doy el parametro de "/enfermeria" para hacer las consultas de los endpoints todo usando la funcion nativa "use" de express

en el archivo "router.js" de la carpeta routes import mongoClient y ObjectId mongo client la defino para poder hacer la conex a la base de datos ademas de eso importo express y lo uso en la variable router para poder usar la funciones de CRUDS le genero a la variable "uri" la uri de mi db que extraigo desde el .env comienzo a generar los diferentes endpoints dependiendo de lo que se requiera

abajo defino lo que hace cada endpoint

ejercicio1: Obtener todos los pacientes de manera alfabética.

ejercicio2: Obtener las citas de una fecha en específico , donde se ordene los pacientes de manera alfabética.

ejercicio3: Obtener todos los médicos de una especialidad en específico (por ejemplo, ‘Cardiología’).

ejercicio4: Encontrar la próxima cita para un paciente en específico (por ejemplo, el paciente con user_id 1).

ejercicio6: Encontrar todas las citas de un día en específico (por ejemplo, ‘2023-02-02').