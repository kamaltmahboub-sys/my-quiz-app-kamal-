# Firestore Security Specification

## 1. Data Invariants
1. **Default-Deny Baseline**: Every path not explicitly matched is denied for both reads and writes.
2. **Admin Write Exclusivity**: Only verified admins (`request.auth.token.email_verified == true` and either bootstrapped owner emails `kamal@kntbook.com` / `kamal.t.mahboub@gmail.com` or an existing `/admins/{uid}` document) may create, update, or delete questions or update `/config/public`.
3. **Strict Schema & Bounds**:
   - Questions require exact allowed keys (`id`, `part`, `qAr`, `qEn`, `optionsAr`, `optionsEn`, `correct`, `expAr`, `expEn`, `updatedAt`, `updatedBy`, and optional `subPart`), `part` in `1..10`, optional `subPart` in `1..10`, `correct` in `0..3`, exactly 4 options in both languages, bounded string lengths (`<= 2000`), and server-enforced `updatedAt == request.time`.
   - `config/public` requires exact allowed keys, a 5-digit `accessCode` (`^[0-9]{5}$`), bounded positive integer limits, and `updatedAt == request.time`.
4. **No Self-Assigned Admin Roles**: Clients cannot create, update, or delete `/admins/{adminId}`.
5. **Query-Enforced List**: Listing `/questions` enforces `resource.data.part >= 1 && resource.data.part <= 10`, matching the client query `where('part', '>=', 1)` + `where('part', '<=', 10)`.

## 2. Adversarial Payloads ("Dirty Dozen")
1. Unauthenticated write to `/questions/p1_q1` -> `PERMISSION_DENIED`
2. Authenticated non-admin write to `/questions/p1_q1` -> `PERMISSION_DENIED`
3. Spoofed admin email with `email_verified: false` writing to `/questions/p1_q1` -> `PERMISSION_DENIED`
4. Admin creating question with extra shadow field `{ isHiddenAdmin: true }` -> `PERMISSION_DENIED`
5. Admin creating question with `part: 99` (out of `1..10`) -> `PERMISSION_DENIED`
6. Admin creating question with `subPart: 99` (out of `1..10`) -> `PERMISSION_DENIED`
7. Admin creating question with `optionsAr.size() == 2` instead of 4 -> `PERMISSION_DENIED`
8. Admin creating question with oversized `qEn` (> 2000 chars) -> `PERMISSION_DENIED`
9. Admin spoofing client timestamp (`updatedAt != request.time`) -> `PERMISSION_DENIED`
10. Admin spoofing `updatedBy` to another UID -> `PERMISSION_DENIED`
11. Admin updating `config/public` with non-5-digit `accessCode: "abc"` -> `PERMISSION_DENIED`
12. Authenticated user trying to create `/admins/{uid}` to escalate privileges -> `PERMISSION_DENIED`
13. Unauthenticated client trying to `list` `/config` or `/admins` -> `PERMISSION_DENIED`
