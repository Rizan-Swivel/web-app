import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer'; 


import { validateEmail, isValid } from './../Validations';



//Testing validateEmail funtion 
test('1 invalid email pass to validateEmail function', () => {
    const inValidEmail = "hello" ;
    expect(validateEmail(inValidEmail)).toBeFalsy()
});

test('2 invalid email pass to validateEmail function', () => {
    const inValidEmail = "hello@g" ;
    expect(validateEmail(inValidEmail)).toBeFalsy()
});

test('3 invalid email pass to validateEmail function', () => {
    const inValidEmail = "hello@ggg." ;
    expect(validateEmail(inValidEmail)).toBeFalsy()
});

test('4 invalid email pass to validateEmail function', () => {
    const inValidEmail = "hello@ggg.m" ;
    expect(validateEmail(inValidEmail)).toBeFalsy()
});

test('1 Valid email pass to validateEmail function', () => {
    const validEmail = "hello@gmail.com" ;
    expect(validateEmail(validEmail)).toBeTruthy()
});

test('2 Valid email pass to validateEmail function', () => {
    const validEmail = "contact@shop.online" ;
    expect(validateEmail(validEmail)).toBeTruthy()
});

//Testing isValid funtion
test('Input as a text to the isValid function, expect true statement', () => {
    const text = "hello" ;
    expect(isValid(text)).toBeTruthy()
});

test('Input as a empty text to the isValid function, expect false statement', () => {
    const text = "" ;
    expect(isValid(text)).toBeFalsy()
});

test('Input as a numer to the isValid function, expect true statement', () => {
    const number  = 1213 ;
    expect(isValid(number)).toBeTruthy()
});
