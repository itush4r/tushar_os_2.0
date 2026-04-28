import assert from "node:assert/strict";
import { hashIp } from "../lib/hash-ip";

const salt = "test-salt-123";

// Same IP + same salt → same hash
assert.equal(hashIp("1.2.3.4", salt), hashIp("1.2.3.4", salt));

// Different IPs → different hashes
assert.notEqual(hashIp("1.2.3.4", salt), hashIp("5.6.7.8", salt));

// Different salts → different hashes
assert.notEqual(hashIp("1.2.3.4", salt), hashIp("1.2.3.4", "other-salt"));

// Output is 64 hex chars (SHA-256)
const out = hashIp("1.2.3.4", salt);
assert.match(out, /^[0-9a-f]{64}$/);

// Original IP must not appear in hash
assert.ok(!out.includes("1.2.3.4"));

// eslint-disable-next-line no-console
console.log("✓ hash-ip tests pass");
