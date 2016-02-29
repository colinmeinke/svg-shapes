import expect from 'expect';

import getPoints from '../src/getPoints';

describe( 'getPoints', () => {
  it( 'should return correct points of a circle', () => {
    const attributes = { cx: 50, cy: 50, r: 20 };

    const expectedPoints = [
      { x: 50, y: 30 },
      { x: 50, y: 70, curve: { type: 'arc', rx: 20, ry: 20 }},
      { x: 50, y: 30, curve: { type: 'arc', rx: 20, ry: 20 }},
    ];

    const points = getPoints( 'circle', attributes );

    expect( points ).toEqual( expectedPoints );
  });

  it( 'should return correct points of an ellipse', () => {
    const attributes = { cx: 100, cy: 300, rx: 65, ry: 120 };

    const expectedPoints = [
      { x: 100, y: 180 },
      { x: 100, y: 420, curve: { type: 'arc', rx: 65, ry: 120 }},
      { x: 100, y: 180, curve: { type: 'arc', rx: 65, ry: 120 }},
    ];

    const points = getPoints( 'ellipse', attributes );

    expect( points ).toEqual( expectedPoints );
  });

  it( 'should return correct points of a line', () => {
    const attributes = { x1: 10, x2: 50, y1: 70, y2: 200 };

    const expectedPoints = [
      { x: 10, y: 70 },
      { x: 50, y: 200 },
    ];

    const points = getPoints( 'line', attributes );

    expect( points ).toEqual( expectedPoints );
  });

  it( 'should return correct points of a polygon', () => {
    const attributes = { points: '20,30 50,90 20,90 50,30' };

    const expectedPoints = [
      { x: 20, y: 30 },
      { x: 50, y: 90 },
      { x: 20, y: 90 },
      { x: 50, y: 30 },
      { x: 20, y: 30 },
    ];

    const points = getPoints( 'polygon', attributes );

    expect( points ).toEqual( expectedPoints );
  });

  it( 'should return correct points of a polyline', () => {
    const attributes = { points: '20,30 50,90 20,90 50,30' };

    const expectedPoints = [
      { x: 20, y: 30 },
      { x: 50, y: 90 },
      { x: 20, y: 90 },
      { x: 50, y: 30 },
    ];

    const points = getPoints( 'polyline', attributes );

    expect( points ).toEqual( expectedPoints );
  });

  it( 'should return correct points of a rect', () => {
    const attributes = { height: 20, width: 50, x: 10, y: 10 };

    const expectedPoints = [
      { x: 10, y: 10 },
      { x: 60, y: 10 },
      { x: 60, y: 30 },
      { x: 10, y: 30 },
      { x: 10, y: 10 },
    ];

    const points = getPoints( 'rect', attributes );

    expect( points ).toEqual( expectedPoints );
  });

  it( 'should return correct points of a rect (with corner radius)', () => {
    const attributes = { height: 200, rx: 5, ry: 10, width: 500, x: 50, y: 50 };

    const expectedPoints = [
      { x: 55, y: 50 },
      { x: 545, y: 50 },
      { x: 550, y: 60, curve: { type: 'arc', rx: 5, ry: 10, sweepFlag: 1 }},
      { x: 550, y: 240 },
      { x: 545, y: 250, curve: { type: 'arc', rx: 5, ry: 10, sweepFlag: 1 }},
      { x: 55, y: 250 },
      { x: 50, y: 240, curve: { type: 'arc', rx: 5, ry: 10, sweepFlag: 1 }},
      { x: 50, y: 60 },
      { x: 55, y: 50, curve: { type: 'arc', rx: 5, ry: 10, sweepFlag: 1 }},
    ];

    const points = getPoints( 'rect', attributes );

    expect( points ).toEqual( expectedPoints );
  });
});
