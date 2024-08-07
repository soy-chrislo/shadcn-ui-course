import express from "express";
import cors from "cors";
import { barrios } from "./data/barrios.js";
import { comunas } from "./data/comunas.js";
import { relacionesBarriosComunas } from "./data/relacionesBarriosComunas.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
const port = 3000;

// ! -> Aquí
app.get("/barrios", (req, res) => {
	const barriosConComunaId = barrios.map((barrio) => {
		const relacion = relacionesBarriosComunas.find(
			(rel) => rel.idBarrio === barrio.id,
		);
		const communeId = relacion ? relacion.idComuna : null;
		return { ...barrio, communeId };
	});
	return res.json(barriosConComunaId);
});

// ! -> Aquí
app.get("/comunas", (req, res) => {
	const comunasConNeighbourhoodIds = comunas.map((comuna) => {
		const neighbourhoodIds = relacionesBarriosComunas
			.filter((rel) => rel.idComuna === comuna.id)
			.map((rel) => rel.idBarrio);
		return { ...comuna, neighbourhoodIds };
	});
	return res.json(comunasConNeighbourhoodIds);
});

app.get("/comunas/:id", (req, res) => {
	const { id } = req.params;
	const comuna = comunas.find((comuna) => comuna.id === Number(id));
	if (!comuna) {
		return res.status(404).json({ message: "Comuna not found" });
	}
	const barriosDeComuna = relacionesBarriosComunas
		.filter((rel) => rel.idComuna === Number(id))
		.map((rel) => barrios.find((barrio) => barrio.id === rel.idBarrio));
	return res.json({ ...comuna, barrios: barriosDeComuna });
});

app.get("/barrios/:id", (req, res) => {
	const { id } = req.params;
	const barrio = barrios.find((barrio) => barrio.id === Number(id));
	if (!barrio) {
		return res.status(404).json({ message: "Barrio not found" });
	}
	const relacion = relacionesBarriosComunas.find(
		(rel) => rel.idBarrio === Number(id),
	);
	const comunaId = relacion ? relacion.idComuna : null;
	return res.json({ ...barrio, comunaId });
});

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
