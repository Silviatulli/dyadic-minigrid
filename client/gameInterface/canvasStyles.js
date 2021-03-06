const FONT = "20px Source Sans Pro"

//const TOTAL_WIDTH = 495
//const TOTAL_HEIGHT = 405

const TOTAL_WIDTH = 220
const TOTAL_HEIGHT = 300

export const TITLE_SECTION_STYLE = {
    width: TOTAL_WIDTH,
    height: 70,
    font: FONT,
    textColor: "white",
	fill: "#111111"
}

export const SCORE_STYLE = {
    //left: TOTAL_WIDTH - 100,
    left: TOTAL_WIDTH - 50,
    top: 40,
    width: 100,
    height: 100,
    font: FONT,
    textColor: 'transparent',
     /*change to white to see it*/
}

export const TIME_STYLE = {
    left: TOTAL_WIDTH - 300,
    top: 40,
    width: 100,
    height: 70,
    font: FONT,
    textColor: "white",
    fill: "#111111"
}

export const CANVAS_STYLE = {
    width: TOTAL_WIDTH,
    height: TOTAL_HEIGHT,
    backgroundColor: "#111111"
}

export let CELL_STYLE = {
    width: 20,
    height: 20,
    stroke: '#444444'
}

export const BOARD_STYLE = {
    width: TOTAL_WIDTH,
    height: 335,
    fill: '#444444'
}



export const OBJECT_STYLES = {

    // Empty
    0: {
        fill: '#111111'
    },

    // Wall
    1: {
        fill: '#444444'
    },

    // Player
    2: {
        fill: 'red'
    },

    // Blue keys
    3: {
        fill: 'blue'
    },

    // Yellow objects
    4: {
        fill: 'chocolate'
    },

    // Purple objects
    5: {
        fill: 'fuchsia'
    },

    // Locked doors
    6: {
        fill: 'darkgrey'
    },

    // Unlocked doors
    7: {
        fill: 'darkgrey'
    },

    // Objects (?)
    8: {
        fill: 'white'
    },

    // Hidden objects
    9: {
        fill: 'seagreen'
    },

    // Goal
    10: {
        fill: 'green'
    }

}
