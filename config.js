const config = {
    tickFPS: 10,
    durationExplode: 4000,
    radius: 150,
    scaleLargeCircle: 1.0,
    scaleSmallCircle: 0.6,

    markers: [
        "Attack1", "Attack2", "Attack3", "Attack4",
        "Bind1", "Bind2", "Bind3", "Stop1"
    ],

    circles: [{
            id: "c1",
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
            id: "c2",
            x: 150,
            y: 450,
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
            priority: 1,
        },
        {
            id: "a2",
            imageId: "a2",
            group: 1,
            priority: 2,
        },
        {
            id: "a3",
            imageId: "a3",
            group: 1,
            priority: 3,
        },
        {
            id: "a4",
            imageId: "a4",
            group: 1,
            priority: 4,
        },
        {
            id: "b1",
            imageId: "b1",
            group: 2,
            priority: 5,
        },
        {
            id: "b2",
            imageId: "b2",
            group: 2,
            priority: 6,
        },
        {
            id: "b3",
            imageId: "b3",
            group: 2,
            priority: 7,
        },
        {
            id: "b4",
            imageId: "s1",
            group: 2,
            priority: 8,
        }
    ],
};

module.exports = config;