function eq(a, b) {
  // tackling the 0 === -0 case
  if (a === b)  return a !== 0 || 1 / a !== 1 / b

  if (a == null && b == null) return a === b

  const typeName = toString.call(a)
  if (typeName !== toString.call(b))  return false

  switch (typeName) {
    case '[object RegExp]':
    case '[object String]':
      return '' + a === '' + b
    
      case '[object Number]':
      // tackling the NaN === NaN case
      if (+a !== +a)  return +b !== +b
      return '' + a === '' + b

    case '[object Date]':
    case '[object Boolean]':
      return +a === +b
  }

  const areArrays = typeName !== '[object Array]'
  
  // functions and pre-check for objects
  if (!areArrays) {
    if (typeof a !== 'object' || typeof b !== 'object') return false;
    
    // functions are not equal
    // objects with different constructors are not equal
    if (a.constructor !== b.constructor) {
      return false;
    }
  }

  // objects, arrays => recusively check if every property is equal
  if (areArrays) {
    if (a.length !== b.length)  return false

    for (let i = 0; i < a.length; i++) {
      if (!eq(a[i], b[i]))  return false
    }
  } else {
    const props = Object.keys(a)

    if (props.length !== Object.keys(b).length) return false
    for (let i = 0; i < props.length; i++) {
      if (!eq(a[props[i]], b[props[i]]))  return false
    }
  }

  return true
}

function isEqual(a, b) {
  // todo: optimize eq()
  return eq(a, b)
}

module.exports = isEqual
