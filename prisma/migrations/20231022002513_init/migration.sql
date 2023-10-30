-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bankaccounts" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "bank_name" TEXT NOT NULL,
    "bank_account_number" TEXT NOT NULL,
    "ballance" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "bankaccounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profile" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "identity_type" TEXT NOT NULL,
    "identity_number" TEXT NOT NULL,
    "address" TEXT NOT NULL,

    CONSTRAINT "profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transactions" (
    "id" SERIAL NOT NULL,
    "source_account_id" INTEGER NOT NULL,
    "destination_account_id" INTEGER NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "transactions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "bankaccounts_user_id_key" ON "bankaccounts"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "profile_user_id_key" ON "profile"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "transactions_id_key" ON "transactions"("id");

-- CreateIndex
CREATE UNIQUE INDEX "transactions_source_account_id_key" ON "transactions"("source_account_id");

-- CreateIndex
CREATE UNIQUE INDEX "transactions_destination_account_id_key" ON "transactions"("destination_account_id");

-- AddForeignKey
ALTER TABLE "bankaccounts" ADD CONSTRAINT "bankaccounts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profile" ADD CONSTRAINT "profile_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_source_account_id_fkey" FOREIGN KEY ("source_account_id") REFERENCES "bankaccounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_destination_account_id_fkey" FOREIGN KEY ("destination_account_id") REFERENCES "bankaccounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
