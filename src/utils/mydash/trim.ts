export function trim(str: string, chars = ' \xA0') {
    const regex = new RegExp(`^[${chars}]+|[${chars}]+$`, 'g');
    return str.replace(regex, '')
}


//   trim('  abc  '); // => 'abc'
//   trim('-_-abc-_-', '_-'); // => 'abc'
//   trim('\xA0foo'); // "foo"
//   trim('\xA0foo', ' '); // " foo"
//   trim('-_-ab c -_-', '_-'); // ab c

//   ['  foo  ', '  bar  '].map(value => trim(value)); // => ['foo', 'bar']
