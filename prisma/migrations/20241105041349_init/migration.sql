-- CreateEnum
CREATE TYPE "StatusAppointment" AS ENUM ('HABILITADA', 'DESABILITADA');

-- CreateEnum
CREATE TYPE "TimeZone" AS ENUM ('UTC', 'America_New_York', 'America_Chicago', 'America_Denver', 'America_Los_Angeles', 'Europe_London', 'Europe_Paris', 'Asia_Kolkata', 'Asia_Tokyo', 'Australia_Sydney', 'Pacific_Auckland', 'America_Mexico_City');

-- CreateTable
CREATE TABLE "Client" (
    "id" TEXT NOT NULL,
    "paternalSurname" TEXT NOT NULL,
    "maternalSurname" TEXT NOT NULL,
    "timeZone" "TimeZone" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);
