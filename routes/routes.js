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
        const result = await collection.find().sort({ usu_nombre: 1 }).toArray();
        res.json(result);
        client.close();
    } catch (error) {
        console.log(error);
    }
});

router.get("/ejercicio2", async (req, res) => {
    try {
        let datos = []
        const fechaBusqueda = new Date("2023-02-02T05:00:00.000Z");
        const client = new MongoClient(uri);
        client.connect();
        const db = client.db(nombreBase);
        const collection = db.collection("cita");
        const result = await collection.aggregate([
            { $match: { cit_fecha: fechaBusqueda } },
            {
                $lookup: {
                    from: "usuario",
                    localField: "cit_datosUsuario",
                    foreignField: "_id",
                    as: "usuario"
                }
            },
            {
                $unwind: "$usuario"
            },
            {
                $sort: { "usuario.usu_nombre": 1 }
            }]).toArray();
        for (let i = 0; i < result.length; i++) {
            datos.push(result[i].usuario)
        }
        res.json(datos);
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
        const collection = db.collection("especialidad");
        const result = await collection.aggregate([
            { $match: { esp_nombre: "Cardiología" } },
            {
                $lookup: {
                    from: "medico",
                    localField: "_id",
                    foreignField: "med_especialidad",
                    as: "medicos"
                }
            }]).toArray();
        res.json(result[0].medicos)
        client.close();
    } catch (error) {
        console.log(error);
    }
});

router.get("/ejercicio4", async (req, res) => {
    try {
        const id = new ObjectId("6502fe2d54d100689c3796d8")
        const client = new MongoClient(uri);
        client.connect();
        const db = client.db(nombreBase);
        const collection = db.collection("usuario");
        const result = await collection.aggregate([
            { $match: { _id: id } },
            {
                $lookup: {
                    from: "cita",
                    localField: "_id",
                    foreignField: "cit_datosUsuario",
                    as: "citas"
                }
            }]).toArray();
        res.json(result);
        client.close();
    } catch (error) {
        console.log(error);
    }
});

router.get("/ejercicio5", async (req, res) => {
    try {
        const client = new MongoClient(uri);
        client.connect();
        const db = client.db(nombreBase);
        const collection = db.collection("medico");
        const result = await collection.aggregate([{ $match: { med_nombreCompleto: "Rodrigo Anderson Martinez Judas" } },
        {
            $lookup: {
                from: "cita",
                localField: "_id",
                foreignField: "cit_medico",
                as: "citas"
            }
        },
        {
            $unwind: "$citas"
        },
        {
            $lookup: {
                from: "usuario",
                localField: "citas.cit_datosUsuario",
                foreignField: "_id",
                as: "usuarios"
            }
        },
        {
            $unwind: "$usuarios"
        }]).toArray();
        res.json(result);
    } catch (error) {
        console.log(error);
    }
})

router.get("/ejercicio6", async (req, res) => {
    try {
        const fecha = new Date("2023-02-02T05:00:00.000+00:00");
        const client = new MongoClient(uri);
        client.connect();
        const db = client.db(nombreBase);
        const collection = db.collection("cita");
        const result = await collection.find({ cit_fecha: fecha }).toArray();
        res.json(result);
        client.close();
    } catch (error) {
        console.log(error);
    }
});

router.get("/ejercicio7", async (req, res) => {
    try {
        const client = new MongoClient(uri);
        client.connect();
        const db = client.db(nombreBase);
        const collection = db.collection("medico");
        const result = await collection.aggregate([{
            $lookup: {
                from: "consultorio",
                localField: "med_consultorio",
                foreignField: "_id",
                as: "consultorios"
            },
        }]).toArray();
        res.json(result);
        client.close();
    } catch (error) {
        console.log(error);
    }
});

router.get("/ejercicio8", async (req, res) => {
    try {
        const medico = new ObjectId("650316e654d100689c37974c");
        const fecha = new Date("2023-02-02T05:00:00.000+00:00");
        const client = new MongoClient(uri);
        client.connect();
        const db = client.db(nombreBase);
        const collection = db.collection("cita");
        const result = await collection.find({ $and: [{ cit_medico: medico }, { cit_fecha: fecha }] }).toArray();
        res.json(result);
        client.close();
    } catch (error) {
        console.log(error);
    }
});

router.get("/ejercicio9", async (req, res) => {
    try {
        const client = new MongoClient(uri);
        client.connect();
        const db = client.db(nombreBase);
        const collection = db.collection("cita");
        const result = await collection.aggregate([{ $match: { cit_datosUsuario: new ObjectId("6502fb7154d100689c3796d4") } }, {
            $lookup: {
                from: "usuario",
                localField: "cit_datosUsuario",
                foreignField: "_id",
                as: "usuarios"
            },
        },
        {
            $lookup: {
                from: "medico",
                localField: "cit_medico",
                foreignField: "_id",
                as: "medicos"
            }
        },
        {
            $lookup: {
                from: "consultorio",
                localField: "medicos.med_consultorio",
                foreignField: "_id",
                as: "consultorios"
            }
        },
        {
            $project: {
                usuarios: 1,
                consultorios: 1
            }
        }
        ]).toArray();
        res.json(result);
        client.close();
    } catch (error) {
        console.log(error);
    }
});

router.get("/ejercicio10", async (req, res) => {
    try {
        const client = new MongoClient(uri);
        client.connect();
        const db = client.db(nombreBase);
        const collection = db.collection("cita");
        const result = await collection.aggregate([{
            $match: { cit_estadoCita: new ObjectId("650315a554d100689c37973b") },
        },
        {
            $lookup: {
                from: "usuario",
                localField: "cit_datosUsuario",
                foreignField: "_id",
                as: "usuarios"
            }
        },
        {
            $unwind: "$usuarios"
        },
        {
            $match: {
                "usuarios.usu_genero": new ObjectId("650303f754d100689c3796fd")
            }
        },
        {
            $project: {
                usuarios: 1
            }
        }
        ]).toArray();
        res.json(result);
        client.close();
    } catch (error) {
        console.log(error);
    }
});

router.get("/ejercicio12", async (req, res) => {
    try {
        const client = new MongoClient(uri);
        client.connect();
        const db = client.db(nombreBase);
        const collection = db.collection("cita");
        const result = await collection.aggregate([
            {
                $match: {
                    cit_estadoCita: new ObjectId("650315c654d100689c37973e"),
                    cit_fecha: {
                        $gte: new Date("2023-11-01T00:00:00Z"),
                        $lt: new Date("2023-12-01T00:00:00Z")
                    }
                }
            }
        ]).toArray();
        res.json(result);
        client.close();
    } catch (error) {
        console.log(error);
    }
});

export default router;