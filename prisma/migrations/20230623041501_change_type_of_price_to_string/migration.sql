-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Trash" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "title" TEXT NOT NULL,
    "qty" INTEGER NOT NULL,
    "category" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "img" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Trash_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Trash" ("category", "createdAt", "desc", "id", "img", "price", "qty", "title", "updatedAt", "userId") SELECT "category", "createdAt", "desc", "id", "img", "price", "qty", "title", "updatedAt", "userId" FROM "Trash";
DROP TABLE "Trash";
ALTER TABLE "new_Trash" RENAME TO "Trash";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
