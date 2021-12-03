import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import ShallowRenderer from 'react-test-renderer/shallow';
import { render, fireEvent, waitFor, screen } from '@testing-library/react'

import { Button } from './../index';

test("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Button></Button>, div);
})


test('Button Snapshot with type primary ', () => {
    const type = "primary";
    const styleClasses = "mr-2";
    const tree = renderer
        .create(
            <Button type={type} className={styleClasses}></Button>
        )
        .toJSON();
    expect(tree).toMatchSnapshot();
});


test('Button Snapshot with children as Submit', () => {
    const type = "primary";
    const styleClasses = "mr-2";
    const children = "Submit";
    const tree = renderer
        .create(
            <Button type={type} className={styleClasses}>{children}</Button>
        )
        .toJSON();
    expect(tree).toMatchSnapshot();
});

test('Button snapshot for sizes', () => {
    const type = "primary";
    const styleClasses = "mr-2";
    const children = "Submit";
    const size = ['sm', 'lg'];
    const tree = renderer
        .create(
            <Button type={type} size={size[0]} className={styleClasses}>{children}</Button>
        )
        .toJSON();
    expect(tree).toMatchSnapshot();
});


test('Button ShallowRenderer test', () => {
    const renderer = new ShallowRenderer();
    renderer.render(<Button>Submit</Button>);
    const result = renderer.getRenderOutput();
    expect(result.type).toBe('button');
    expect(result).toEqual(<button data-testid="button" className="undefined py-2 px-4 text-xs undefined">Submit</button>);
    expect(result.props.children).toEqual("Submit");
});

test('Button ShallowRenderer test passing type and size', () => {
    const renderer = new ShallowRenderer();
    renderer.render(<Button type="success" size="sm" className="w-24">Submit</Button>);
    const result = renderer.getRenderOutput();
    expect(result.type).toBe('button');
    expect(result).toEqual(<button data-testid="button" className="bg-success hover:opacity-75 text-white font-bold rounded py-2 px-4 text-xs w-24">Submit</button>);
    expect(result.props.children).toEqual("Submit");
});