import { Block, BlockProps } from '../../lib/Block';
import { compileTemplate } from '../../lib/templator';
import './styles.css';


export class WithLoader extends Block<BlockProps> {
    props: {
        blockClass,
        data,
        getData,

        loading: boolean
    }

    constructor({ blockClass, data, getData }) {
        super('div', {
            attributes: {
                className: 'with-loader-container',
            },

            blockClass,
            data,
            getData,

            loading: !data && Boolean(getData)
        })
    }

    componentDidMount() {
        if (this.props.loading) {
            this.props.getData()
                .then((res) => {
                    if (res.ok) {
                        this.setProps({ data: res.response })
                    }
                });
        }
    }

    render() {
        return !this.props.loading
            ? new this.props.blockClass(this.props.data).render()
            : compileTemplate('<div class="loader">Происходит загрузка............</div>', {});
    }
}