const config = {
    tickFPS: 10,
    durationExplode: 4000,
    radius: 150,

    markers: [
        "Attack1", "Attack2", "Attack3", "Attack4",
        "Bind1", "Bind2", "Bind3", "Stop1"
    ],

    circles: [{
            x: 150,
            y: 150,
            regX: 150,
            regY: 150,
            outer: {
                id: "c1_out",
                imageId: "cout",
                rotation: 360,
            },
            inner: {
                id: "c1_in",
                imageId: "cin",
                rotation: -360,
            }
        }, {
            x: 150,
            y: 350,
            regX: 150,
            regY: 150,
            outer: {
                id: "c2_out",
                imageId: "cout",
                rotation: 360,
            },
            inner: {
                id: "c2_in",
                imageId: "cin",
                rotation: -360,
            }
        }],

    manifest: [{
            id: "cout",
            src: require('images/circle_out.png'),
        },
        {
            id: "cin",
            src: require('images/circle_in.png')
        },
        {
            id: "a1",
            src: require('images/a1.png')
        },
        {
            id: "a2",
            src: require('images/a2.png')
        },
        {
            id: "a3",
            src: require('images/a3.png')
        },
        {
            id: "a4",
            src: require('images/a4.png')
        },
        {
            id: "b1",
            src: require('images/b1.png')
        },
        {
            id: "b2",
            src: require('images/b2.png')
        },
        {
            id: "b3",
            src: require('images/b3.png')
        },
        {
            id: "s1",
            src: require('images/s1.png')
        }
    ],

    members: [{
            id: "a1",
            imageId: "a1",
            group: 1,
        },
        {
            id: "a2",
            imageId: "a2",
            group: 1,
        },
        {
            id: "a3",
            imageId: "a3",
            group: 1,
        },
        {
            id: "a4",
            imageId: "a4",
            group: 1,
        },
        {
            id: "b1",
            imageId: "b1",
            group: 2,
        },
        {
            id: "b2",
            imageId: "b2",
            group: 2,
        },
        {
            id: "b3",
            imageId: "b3",
            group: 2,
        },
        {
            id: "b4",
            imageId: "s1",
            group: 2,
        }
    ],
};

module.exports = config;