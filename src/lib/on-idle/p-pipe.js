const promiseReducer = (current, next) => current.then(next)
const hasNonFunction = fnArray => fnArray.some(fn => typeof fn !== 'function')

const PromisePipeFactory = Promise => (...fns) => {
  if (fns.length === 0) return () => Promise.resolve()
  if (hasNonFunction(fns)) throw new TypeError('Expected a function')

  const head = fns[0]
  const rest = fns.slice(1)

  return (...args) => rest.reduce(promiseReducer, Promise.resolve().then(() => head(...args)))
}

export { PromisePipeFactory }
export default PromisePipeFactory(Promise)
