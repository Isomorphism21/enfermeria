import { MongoClient, ObjectId } from "mongodb";
import express from "express";
import dotenv from "dotenv";
dotenv.config();

const uri = process.env.MONGO_URI;
console.log(uri);
const nombreBase = "enfermeria";

const router = express();

router.get("/ejercicio1", async (req, res) => {
    try {
        const client = new MongoClient(uri);
        client.connect();
        const db = client.db(nombreBase);
        const collection = db.collection("usuario");
        const result = await collection.find().toArray();
        res.json(result);
        client.close();
    } catch (error) {
        console.log(error);
    }
});

router.get("/ejercicio2", async (req, res) => {
    try {
        const fechaBusqueda = new Date("2023-02-02T05:00:00.000Z");
        const client = new MongoClient(uri);
        client.connect();
        const db = client.db(nombreBase);
        const collection = db.collection("cita");
        const collection2 = db.collection("usuario")
        const result = await collection.find({cit_fecha: {$eq: fechaBusqueda}}).toArray();
        const usuario1 = result[0].cit_datosUsuario;
        const usuario2 = result[1].cit_datosUsuario;
        const result2 = await collection2.find({_id: usuario1}).toArray();
        const result3 = await collection2.find({_id: usuario2}).toArray();
        res.json({result3, result2});
        console.log(usuario1);
        client.close();
    } catch (error) {
        console.log(error);
    }
});

router.get("/ejercicio3", async (req, res) => {
    try {
        const client = new MongoClient(uri);
        client.connect();
        const db = client.db(nombreBase);
        const collection = db.collection("medico");
        const collection2 = db.collection("especialidad")
        const result = await collection.find().toArray();
        const especialidad = result[0].med_especialidad;
        const result2 = await collection.find({med_especialidad: new ObjectId(especialidad)}).toArray();
        const result3 = await collection2.find({_id: new ObjectId(especialidad)}).toArray();
        console.log(result3[0].esp_nombre);
        res.json(`los medicos: ${result2[0].med_nombreCompleto} y ${result2[1].med_nombreCompleto} tiene la especialidad de ${result3[0].esp_nombre}`)
        client.close();
    } catch (error) {
        console.log(error);
    }
});

router.get("/ejercicio4", async (req, res) => {
    try {
        const client = new MongoClient(uri);
        client.connect();
        const db = client.db(nombreBase);
        const collection = db.collection("cita");
        const collection2 = db.collection("usuario");
        const result = await collection.findOne({cit_fecha: new Date("2023-09-09T05:00:00.000Z")});
        const idUsuario = result.cit_datosUsuario;
        console.log(idUsuario);
        const result2 = await collection2.findOne({_id: new ObjectId(idUsuario)})
        console.log(result2);
        res.json(`La proxima cita de ${result2.usu_nombre}, ${result2.usu_primer_apellido_usuar} es el ${result.cit_fecha}`);
        client.close();
    } catch (error) {
        console.log(error);
    }
});

export default router;