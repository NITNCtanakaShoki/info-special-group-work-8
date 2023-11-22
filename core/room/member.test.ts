import { assertStrictEquals } from "../../deps.ts";
import { Member } from "./member.ts";

Deno.test("等価", () => {
  const a = new Member("alice", ["bob"], ["carol"]);
  const b = new Member("alice", ["bob"], ["carol"]);
  assertStrictEquals(a.equals(b), true);
});

Deno.test("非等価", () => {
  const a = new Member("alice", ["bob"], ["carol"]);
  const b = new Member("bob", ["alice"], ["carol"]);
  assertStrictEquals(a.equals(b), false);
});

Deno.test("好ましい", () => {
  const a = new Member("alice", ["bob"], ["carol"]);
  const b = new Member("bob", ["alice"], ["carol"]);
  assertStrictEquals(a.isLike(b), true);
});

Deno.test("好ましくない", () => {
  const a = new Member("alice", ["bob"], ["carol"]);
  const b = new Member("bob", ["alice"], ["carol"]);
  assertStrictEquals(a.isDislike(b), false);
});

Deno.test("嫌い", () => {
  const a = new Member("alice", ["carol"], ["bob"]);
  const b = new Member("bob", ["alice"], ["carol"]);
  assertStrictEquals(a.isDislike(b), true);
});

Deno.test("嫌いでない", () => {
  const a = new Member("alice", ["carol"], ["bob"]);
  const b = new Member("bob", ["alice"], ["carol"]);
  assertStrictEquals(a.isLike(b), false);
});

Deno.test("好きであり、嫌いでないなら差分1", () => {
  const a = new Member("alice", ["bob"], ["carol"]);
  const b = new Member("bob", ["alice"], ["carol"]);
  assertStrictEquals(a.diffPoint(b), 1);
});

Deno.test("嫌いであり、好きでないなら差分-1", () => {
  const a = new Member("alice", ["carol"], ["bob"]);
  const b = new Member("bob", ["alice"], ["carol"]);
  assertStrictEquals(a.diffPoint(b), -1);
});

Deno.test("好きでも嫌いでもないなら差分0", () => {
  const a = new Member("alice", [], []);
  const b = new Member("bob", [], []);
  assertStrictEquals(a.diffPoint(b), 0);
});

Deno.test("好きで嫌いなら差分0", () => {
  const a = new Member("alice", ["bob"], ["bob"]);
  const b = new Member("bob", ["alice"], ["alice"]);
  assertStrictEquals(a.diffPoint(b), 0);
});
