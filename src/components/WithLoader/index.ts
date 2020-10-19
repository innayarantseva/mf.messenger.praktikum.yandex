import { Block, BlockProps } from '../../lib/Block';
import { compileTemplate } from '../../lib/templator';
import { isEqual } from '../../utils/mydash/isEqual';
import './styles.css';


export class WithLoader extends Block<BlockProps> {
    props: {
        blockClass,
        data,
        getData,

        loading: boolean
    }
    _block

    constructor({ blockClass, data, getData }) {
        super('div', {
            attributes: {
                className: 'with-loader-container'
            },

            blockClass,
            data,
            getData,

            loading: !data && Boolean(getData)
        });

        this._block = data ? new this.props.blockClass(data) : null;
    }

    // обновление не работает 🤬
    // componentDidUpdate({ data: oldData }, { data: newData }) {
    //     if (oldData && !isEqual(oldData, newData)) {
    //         if (this._block) {
    //             this._block.setProps({ data: { ...oldData, ...newData } });
    //         }
    //     }

    //     return false;
    // }

    componentDidMount() {
        if (this.props.loading) {
            this.props.getData()
                .then((res) => {
                    if (res.ok) {
                        this.setProps({ data: res.response, loading: false })
                    }
                });
        }
    }

    render() {
        if (this.props.loading) {
            return compileTemplate('<div class="loader">Происходит загрузка............</div>', {});
        } else {
            if (this._block) {
                return this._block.render();
            } else {
                const block = new this.props.blockClass(this.props.data);
                this._block = block;

                return block.render();
            }
        }
    }
}