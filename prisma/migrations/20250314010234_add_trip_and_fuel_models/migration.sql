-- CreateTable
CREATE TABLE "Trip" (
    "id" SERIAL NOT NULL,
    "dayCode" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,
    "startOdo" INTEGER NOT NULL,
    "endOdo" INTEGER,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3),
    "totalEarnings" DECIMAL(65,30) NOT NULL DEFAULT 0.0,
    "fuelExpense" DECIMAL(65,30) NOT NULL DEFAULT 0.0,
    "totalProfit" DECIMAL(65,30) NOT NULL DEFAULT 0.0,
    "poForUser" DECIMAL(65,30) NOT NULL DEFAULT 0.0,
    "poForCompany" DECIMAL(65,30) NOT NULL DEFAULT 0.0,
    "status" TEXT NOT NULL DEFAULT 'NOT_STARTED',

    CONSTRAINT "Trip_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Fuel" (
    "id" SERIAL NOT NULL,
    "tripId" INTEGER NOT NULL,
    "odoOfRefill" INTEGER NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "Fuel_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Trip" ADD CONSTRAINT "Trip_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fuel" ADD CONSTRAINT "Fuel_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "Trip"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
