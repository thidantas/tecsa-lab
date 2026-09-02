import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const firstNames = [
  'Ana',
  'Bruno',
  'Camila',
  'Diego',
  'Elena',
  'Felipe',
  'Gabriela',
  'Henrique',
  'Isabela',
  'João',
  'Karina',
  'Lucas',
  'Marina',
  'Nicolas',
  'Olivia',
  'Paulo',
  'Queila',
  'Rafael',
  'Sofia',
  'Thiago',
];

const lastNames = [
  'Almeida',
  'Barbosa',
  'Cardoso',
  'Dias',
  'Esteves',
  'Ferreira',
  'Gomes',
  'Henriques',
  'Ibrahim',
  'Jesus',
  'Klein',
  'Lima',
  'Mendes',
  'Nogueira',
  'Oliveira',
  'Pereira',
  'Queiroz',
  'Rocha',
  'Silva',
  'Teixeira',
];

const sexes = ['F', 'M'] as const;

const biomarkerCatalog = [
  { name: 'glucose', unit: 'mg/dL', refLow: 70, refHigh: 99 },
  { name: 'hba1c', unit: '%', refLow: 4, refHigh: 5.6 },
  { name: 'vitamin_d', unit: 'ng/mL', refLow: 30, refHigh: 100 },
  { name: 'weight', unit: 'kg', refLow: null, refHigh: null },
] as const;

function pick<T>(items: readonly T[], index: number) {
  return items[index % items.length];
}

function jitter(base: number, spread: number, index: number) {
  const offset = ((index * 17) % 21) - 10;
  return Number((base + (offset / 10) * spread).toFixed(1));
}

async function main() {
  await prisma.featureFlag.upsert({
    where: { key: 'ai_actions' },
    create: { key: 'ai_actions', enabled: true },
    update: {},
  });

  const existing = await prisma.patient.count();
  if (existing > 0) {
    return;
  }

  const patients = Array.from({ length: 200 }, (_, index) => {
    const first = pick(firstNames, index);
    const last = pick(lastNames, Math.floor(index / firstNames.length) + index);
    const sex = pick(sexes, index);
    const year = 1955 + (index % 50);

    return {
      name: `${first} ${last}`,
      birthDate: new Date(Date.UTC(year, index % 12, (index % 27) + 1)),
      sex,
      notes: index % 7 === 0 ? 'Retorno em 8 semanas.' : null,
    };
  });

  for (const [index, patient] of patients.entries()) {
    const created = await prisma.patient.create({ data: patient });
    const measuredAt = new Date(Date.UTC(2026, 7, 1 + (index % 28)));

    await prisma.biomarker.createMany({
      data: biomarkerCatalog.map((marker, markerIndex) => {
        const bases = [92, 5.4, 28, 72];
        return {
          patientId: created.id,
          name: marker.name,
          unit: marker.unit,
          value: jitter(bases[markerIndex], markerIndex === 3 ? 18 : 4, index + markerIndex),
          measuredAt,
          refLow: marker.refLow,
          refHigh: marker.refHigh,
        };
      }),
    });
  }

  console.log(`Seeded ${patients.length} patients`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
