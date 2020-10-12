const sinon = require("sinon");
const assert = require("assert");

const LinkedList = require("./LinkedList");


describe("Test LinkedList module", () => {

    it("should exist", () => {
        assert(LinkedList);
    });

    it ("should have LinkedList as default export", () => {
        let ll = new LinkedList();
        assert(ll instanceof LinkedList);
    });

    describe("Test LinkedList class", () => {
        let ll = null;
        let sandbox = null;

        beforeEach(() => {
            ll = new LinkedList();
            sandbox = sinon.createSandbox();
        });

        afterEach(() => {
            sandbox.restore();
        });

        it("push", () => {
            let v1 = Symbol();
            let v2 = Symbol();

            ll.push(v1);
            assert.strictEqual(ll.length, 1);
            assert.strictEqual(ll.peek(), v1);

            ll.push(v2);
            assert.strictEqual(ll.length, 2);
            assert.strictEqual(ll.peek(), v2);
        });

        it("enqueue", () => {
            let v1 = Symbol();
            let v2 = Symbol();

            ll.enqueue(v1);
            assert.strictEqual(ll.length, 1);
            assert.strictEqual(ll.peek(), v1);

            ll.enqueue(v2);
            assert.strictEqual(ll.length, 2);
            assert.strictEqual(ll.peek(), v1);
        });

        describe("pop", () => {
            it("normal operation", () => {
                let v1 = Symbol();
                let v2 = Symbol();

                ll.push(v1);
                ll.push(v2);

                assert.strictEqual(ll.length, 2);

                let r1 = ll.pop();
                assert.strictEqual(r1, v2);
                assert.strictEqual(ll.length, 1);

                let r2 = ll.pop();
                assert.strictEqual(r2, v1);
                assert.strictEqual(ll.length, 0);
            });


            it("empty list", () => {
                assert(ll.length === 0);  // test assumption
                assert.throws(() => {
                    ll.pop();
                });
            });
        });

        describe("dequeue", () => {
            it("normal operation", () => {
                let v1 = Symbol();
                let v2 = Symbol();

                ll.enqueue(v1);
                ll.enqueue(v2);

                assert.strictEqual(ll.length, 2);

                let r1 = ll.dequeue();
                assert.strictEqual(r1, v1);
                assert.strictEqual(ll.length, 1);

                let r2 = ll.dequeue();
                assert.strictEqual(r2, v2);
                assert.strictEqual(ll.length, 0);
            });

            it("empty list", () => {
                assert(ll.length === 0);  // test assumption
                assert.throws(() => {
                    ll.dequeue();
                });
            });
        });

        describe("peek", () => {
            it("normal operation", () => {
                let v1 = Symbol();
                let v2 = Symbol();

                ll.push(v1);
                ll.push(v2);

                assert.strictEqual(ll.length, 2);

                let r = ll.peek();
                assert.strictEqual(r, v2);
                assert.strictEqual(ll.length, 2);
            });

            it("empty list", () => {
                assert(ll.length === 0);  // test assumption
                assert.throws(() => {
                    ll.peek();
                });
            });
        });

        describe("weird stuff", () => {
            it("length should not be settable", () => {
                assert.throws(() => {
                    ll.length = 4;
                });
            });

            it("internal value of head should not be settable", () => {
                ll.head = 17;
                ll.push(4);
                assert.strictEqual(ll.pop(), 4);
            });

            it ("internal value of tail should not be settable", () => {
                ll.tail = 16;
                ll.push(4);
                ll.pop();
                assert.throws(() => ll.pop());
            });
        });
    });


    describe("Test ListNode class", () => {
        it("should instantiate", () => {
            let n = new LinkedList.ListNode(10);
            assert(n instanceof LinkedList.ListNode);
            assert.strictEqual(n.value, 10);
        });

        it("should doubly link", () => {
            let v1 = 3298;
            let v2 = 43798;

            let n1 = new LinkedList.ListNode(v1);
            let n2 = new LinkedList.ListNode(v2);

            LinkedList.ListNode.link(n1, n2);

            // check link
            assert.strictEqual(n1.next, n2);
            assert.strictEqual(n2.prev, n1);

            // make sure values are still intact
            assert.strictEqual(n1.value, v1);
            assert.strictEqual(n2.value, v2);
        });

        it("should unlink", () => {
            let v1 = 3298;
            let v2 = 43798;

            let n1 = new LinkedList.ListNode(v1);
            let n2 = new LinkedList.ListNode(v2);

            LinkedList.ListNode.link(n1, n2);
            LinkedList.ListNode.unlink(n2);

            // check unlink
            assert(! n1.next)
            assert(! n2.prev)

            // make sure values are still intact
            assert.strictEqual(n1.value, v1);
            assert.strictEqual(n2.value, v2);
        });
    });

    describe("LinkedList iterator", () => {
        // @type {LinkedList}
        let ll = null;

        beforeEach(() => {
            ll = new LinkedList();
        });

        afterEach(() => {
            ll = null;
        });

        it("should work with for ... of syntax", () => {
            let values = [0, 1, 2, 3, 4, 5];

            values.forEach((value) => {
                ll.push(value + 2);
            });

            let i = 0;
            for (let value in ll) {
                assert.strictEqual(value, i+2);
                i++;
            }
        });

        it("should work with list spread syntax", () => {
            let values = [0, 1, 2, 3, 4, 5];

            values.forEach((value) => {
                ll.push(value + 2);
            });

            let result = [...ll];

            assert(Array.isArray(result));
            assert.strictEqual(Array.length, values.length);

            for(let i = 0; i < values.length; i++) {
                assert.strictEqual(result[i], i+2);
            }
        })
    });
});

