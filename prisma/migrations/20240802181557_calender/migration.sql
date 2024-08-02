-- CreateTable
CREATE TABLE "contestRatings" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "codeChefRating" INTEGER,
    "codeforcesRating" INTEGER,
    "leetCodeRating" INTEGER,
    "atCoderRating" INTEGER,
    "geeksForGeeksRating" INTEGER,
    "HackerearthRating" INTEGER,

    CONSTRAINT "contestRatings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CodingProfiles" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "CodeChef" TEXT,
    "Codeforces" TEXT,
    "LeetCode" TEXT,
    "AtCoder" TEXT,
    "GeeksForGeeks" TEXT,
    "Hackerearth" TEXT,

    CONSTRAINT "CodingProfiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "calendar_events" (
    "id" TEXT NOT NULL,
    "contestId" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "calendarId" TEXT NOT NULL,
    "eventlink" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "calendar_events_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CodingProfiles_userId_key" ON "CodingProfiles"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "calendar_events_eventId_key" ON "calendar_events"("eventId");

-- AddForeignKey
ALTER TABLE "contestRatings" ADD CONSTRAINT "contestRatings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CodingProfiles" ADD CONSTRAINT "CodingProfiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "calendar_events" ADD CONSTRAINT "calendar_events_contestId_fkey" FOREIGN KEY ("contestId") REFERENCES "Contests"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
