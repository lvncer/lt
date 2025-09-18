-- 既存トークにセッション情報を紐づけるマイグレーション
-- presentationDateベースでsessionIdを設定

-- 2025-05-30のトークを第1回セッションに紐づけ
UPDATE talks 
SET "sessionId" = 1 
WHERE "presentationDate" = '2025-05-30' AND "sessionId" IS NULL;

-- 2025-06-30のトークを第2回セッションに紐づけ
UPDATE talks 
SET "sessionId" = 2 
WHERE "presentationDate" = '2025-06-30' AND "sessionId" IS NULL;

-- 2025-07-31のトークを第3回セッションに紐づけ
UPDATE talks 
SET "sessionId" = 3 
WHERE "presentationDate" = '2025-07-31' AND "sessionId" IS NULL;

-- 2025-09-30のトークを第4回セッション（存在しないので作成後に実行）
-- UPDATE talks 
-- SET "sessionId" = ? 
-- WHERE "presentationDate" = '2025-09-30' AND "sessionId" IS NULL;

-- 確認クエリ
SELECT id, title, "presentationDate", venue, "sessionId" 
FROM talks 
ORDER BY "presentationDate", id;
