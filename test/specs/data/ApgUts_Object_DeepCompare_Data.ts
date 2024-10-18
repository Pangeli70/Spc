export const ApgUts_Object_DeepCompare_Data: any = [
    {
        a: 1,
        b: "B-Val",
        c: {
            d: "D-Val"
        },
        f: [1, 2, 3],
    },
    {   // Same object as [0]
        a: 1,
        b: "B-Val",
        c: {
            d: "D-Val"
        },
        f: [1, 2, 3],
    },
    {   // Different order but same as [0]
        c: {
            d: "D-Val"
        },
        b: "B-Val",
        a: 1,
        f: [1, 2, 3],
    },
    {   // Different type of a in [0]
        a: "1",
        b: "B-Val",
        c: {
            d: "D-Val"
        },
        f: [1, 2, 3],
    },
    {   // c.e not present in [0]
        a: 1,
        b: "B-Val",
        c: {
            d: "D-Val",
            e: new Date()
        },
        f: [1, 2, 3],
    },
    {   // f has less elements than [0]
        a: 1,
        b: "B-Val",
        c: {
            d: "D-Val",
        },
        f: [1, 2],
    }
];
