const config = {
    tickFPS: 10,

    durationExplode: 4000,

    markers: [
        "Attack1", "Attack2", "Attack3", "Attack4",
        "Bind1", "Bind2", "Bind3", "Stop1"
    ],

    circles: [{
            id: "c1_out",
            imageId: "cout",
            x: 150,
            y: 150,
            regX: 150,
            regY: 150,
        },
        {
            id: "c1_in",
            imageId: "cin",
            x: 150,
            y: 150,
            regX: 150,
            regY: 150,
        },
        {
            id: "c2_out",
            imageId: "cout",
            x: 150,
            y: 350,
            regX: 150,
            regY: 150,
        },
        {
            id: "c2_in",
            imageId: "cin",
            x: 150,
            y: 350,
            regX: 150,
            regY: 150,
        },
    ],

    manifest: [{
            id: "cout",
            src: require('images/circle_out.png'),
        },
        {
            id: "cin",
            src: require('images/circle_in.png')
        },
    ],

    members: [{
            id: "a1",
            group: 1,
            src: require('images/a1.png')
        },
        {
            id: "a2",
            group: 1,
            src: require('images/a2.png')
        },
        {
            id: "a3",
            group: 1,
            src: require('images/a3.png')
        },
        {
            id: "a4",
            group: 1,
            src: require('images/a4.png')
        },
        {
            id: "b1",
            group: 2,
            src: require('images/b1.png')
        },
        {
            id: "b2",
            group: 2,
            src: require('images/b2.png')
        },
        {
            id: "b3",
            group: 2,
            src: require('images/b3.png')
        },
        {
            id: "b4",
            group: 2,
            src: require('images/s1.png')
        }
    ],
};

module.exports = config;