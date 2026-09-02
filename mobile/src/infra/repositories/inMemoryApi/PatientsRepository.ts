import type { PatientsRepository } from "@/domain/repositories/PatientsRepository";
import type { PatientDetail } from "@/domain/models/patients";

const patients: PatientDetail[] = [
  {
    id: "in-memory-ana",
    name: "Ana Almeida",
    birthDate: "1988-03-12",
    sex: "F",
    notes: "Retorno em 8 semanas.",
    createdAt: "2026-08-01T00:00:00.000Z",
    biomarkers: [
      {
        id: "in-memory-ana-glucose",
        patientId: "in-memory-ana",
        name: "glucose",
        value: 92,
        unit: "mg/dL",
        measuredAt: "2026-08-01T00:00:00.000Z",
        refLow: 70,
        refHigh: 99,
      },
    ],
  },
];

export function createInMemoryPatientsRepository(): PatientsRepository {
  return {
    list(query) {
      const search = query?.search?.trim().toLowerCase();
      const items = search
        ? patients.filter((patient) =>
            patient.name.toLowerCase().includes(search),
          )
        : patients;

      return Promise.resolve(
        items.map(({ id, name, birthDate, sex }) => ({
          id,
          name,
          birthDate,
          sex,
        })),
      );
    },
    getById(id) {
      const patient = patients.find((item) => item.id === id);

      if (!patient) {
        return Promise.reject(new Error(`Patient ${id} not found`));
      }

      return Promise.resolve(patient);
    },
    updateNotes(id, notes) {
      const patient = patients.find((item) => item.id === id);

      if (!patient) {
        return Promise.reject(new Error(`Patient ${id} not found`));
      }

      patient.notes = notes.trim() || null;
      return Promise.resolve({
        ...patient,
        biomarkers: [...patient.biomarkers],
      });
    },
  };
}
