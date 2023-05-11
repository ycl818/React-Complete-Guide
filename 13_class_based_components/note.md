clsss-based Component Lifecycle

side-effects in functional components: useEffect()

class-based Componentes can't use React Hooks!

- componentDidMount() => called once component mounted (was evaluated and rendered) === useEffect(..., [])
- componentDidUpdate() => called once component updated (was evaluated and rendered) === useEffect(..., ["someValue"])
- componentWillUnmount() => called right before component is unmounted (remove from DOM) === useEffect(() => { return () => {...}}, [])
