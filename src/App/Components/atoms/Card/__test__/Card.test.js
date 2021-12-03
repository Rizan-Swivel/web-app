import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import ShallowRenderer from 'react-test-renderer/shallow';
import { render, fireEvent, waitFor, screen } from '@testing-library/react'

import { Card } from './../index';

test('Card snapshot', () => {
    const type = "primary";
    const styleClasses = "mr-2";
    const children = "card content here";
    const size = ['sm', 'lg'];
    const tree = renderer
        .create(
            <Card type={type} size={size[0]} className={styleClasses}>{children}</Card>
        )
        .toJSON();
    expect(tree).toMatchSnapshot();
});

test('Card ShallowRenderer test without props', () => {
    const renderer = new ShallowRenderer();
    renderer.render(<Card>card content here</Card>);
    const result = renderer.getRenderOutput();
    expect(result.type).toBe('card');
    expect(result).toEqual(<card className="undefined undefined undefined">card content here</card>);
    expect(result.props.children).toEqual("card content here");
});

test('Card ShallowRenderer test with props', () => {
    const renderer = new ShallowRenderer();
    renderer.render(<Card type="primary" size="small" className="mytest">card content here</Card>);
    const result = renderer.getRenderOutput();
    expect(result.type).toBe('card');
    expect(result).toEqual(<card className="border border-gray-400 flex flex-col p-4 rounded shadow w-full md:w-1/4 mytest">card content here</card>);
    expect(result.props.children).toEqual("card content here");
});