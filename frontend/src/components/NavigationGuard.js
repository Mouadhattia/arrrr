import React from "react"

export default class NavigationGuard extends React.Component
{
    constructor(props)
    {
        super(props)
    }
    render()
    {
        return <></>
    }
    componentDidMount()
    {
        this.props.onEnter && this.props.onEnter()
    }
    componentWillUnmount(){
        this.props.onLeave && this.props.onLeave()
    }
}