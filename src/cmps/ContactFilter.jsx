import { Component } from 'react'

export class ContactFilter extends Component {

    state = {
        filterBy: null
    }

    componentDidMount() {
        const { filterBy } = this.props
        this.setState({ filterBy: { ...filterBy } })
    }

    handleChange = ({ target }) => {
        const field = target.name
        let value = target.value
        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break;
            case 'checkbox':
                value = target.checked
                break
            case 'text':
                value = value.trim()
                break
            default:
                break
        }


        this.setState(
            prevState => ({ filterBy: { ...prevState.filterBy, [field]: value } }),
            () => this.props.onChangeFilter({ ...this.state.filterBy })
        )

    }
    render() {
        const { filterBy } = this.state
        if (!filterBy) return <div>Loading...</div>
        return (
            <form className='contact-filter'>
                <section>
                    <input className='search-contacts' type="text" placeholder='Search...' 
                    name="term" onChange={this.handleChange} value={filterBy.term}/>
                    {/* <input ref={this.handleRef} onChange={this.handleChange} value={model} type="text" name="model" id="model" /> */}
                </section>
            </form>
        )
    }
}
