import { getUUID } from './library/helper';

import { detectPrng, monotonicFactory } from 'ulid'
const ulid = monotonicFactory(() => Math.random())

let setContent = function(context, uuid) {
    // Get all the items
    let row = context.clickedRow();
    let col = context.clickedColumn();
    let item = context.currentItem();

    if (row == null || col == null || item == null) {
        context.alert('Error', 'No item cliked');
        return;
    }

    if (uuid == null) {
        context.alert('Error', 'Could not generate.');
        return;
    }

    // Make sure the constant is nil
    row.setConstant(col.name, '');

    // Update row value
    row.update(col.name, uuid);

    // Add to update queue
    item.addUpdate(row);

    // Notify the change
    context.update();
};

let genUlid = function (context) {
    try {
        let str = ulid().toLowerCase();
        setContent(context, str);
    } catch (err) {
        context.alert('Error', err);
    }
}

let v1 = function (context) {
    try {
        let uuid = getUUID("1", true);
        setContent(context, uuid);
    } catch (err) {
        context.alert('Error', err);
    }
}

let v4 = function (context) {
    let uuid = getUUID("4", true);
    setContent(context, uuid);
}

let v1nohyphens = function (context) {
    let uuid = getUUID("1", false);
    setContent(context, uuid);
}

let v4nohyphens = function (context) {
    let uuid = getUUID("4", false);
    setContent(context, uuid);
}

global.genUlid = genUlid;
global.v1 = v1;
global.v4 = v4;
global.v1nohyphens = v1nohyphens;
global.v4nohyphens = v4nohyphens;
