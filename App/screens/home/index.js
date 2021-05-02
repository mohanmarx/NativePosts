import React from 'react'
import { View, ScrollView } from 'react-native'
import { DataTable } from 'react-native-paper';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import Axios from '../../config/Axios'

export class Home extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            posts: [],
            page: 0,
            loading: false,
        }
    }

    componentDidMount() {
        this.getData()
        this.interval = setInterval(() => this.getData(), 10000);
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }

    getData = () => {
        const { posts } = this.state
        let page = posts.length / 20
        this.setState({ loading: true }, () => {
            Axios.get(`search_by_date?tags=story&page=${page}`)
                .then(res => {
                    this.setState(state => {
                        const posts = res.data.hits.map((el) => {
                            el.key = (Math.random() * 1000000).toString()
                            return el;
                        })
                        return {
                            posts: [...state.posts, ...posts],
                            loading: false
                        }
                    })
                })
                .catch(err => {
                    this.setState({ loading: false })
                })
        })
    }

    handleNavigate = (post) => {
        const { navigation } = this.props
        navigation.navigate("Post", { post: post })
    }

    handlePage = (page) => {
        const { posts } = this.state
        if (page > 0) {
            if (posts.length > page * 10) {
                this.getData()
            }
            this.setState({ page: page })
        }
    }

    render() {
        const { posts, page } = this.state
        return (
            <ScrollView>
                <DataTable>
                    <DataTable.Header>
                        {['Title', 'URL', 'Author', 'Created At'].map(el =>
                            <DataTable.Title key={el} style={{}}>{el}</DataTable.Title>
                        )}
                    </DataTable.Header>
                    {posts.length > 0 && posts.slice(((page + 1 * 10) - 10), (page + 1 * 10)).length > 0 ?
                        posts.slice(((page + 1 * 10) - 10), (page + 1 * 10)).map((rowData, index) =>
                            <DataTable.Row key={index} onPress={() => this.handleNavigate(rowData)}>
                                {[rowData.title, rowData.url, rowData.author, new Date(rowData.created_at).toDateString()].map((el, idx) =>
                                    <DataTable.Cell key={el}>{el}</DataTable.Cell>
                                )}
                            </DataTable.Row>
                        ) :
                        <SkeletonPlaceholder>
                            {[...Array(10)].map((el, idx) =>
                                <View key={idx} style={{ flex: 1, height: 47, marginBottom: .2 }} />
                            )}
                        </SkeletonPlaceholder>
                    }

                    <DataTable.Pagination
                        page={page}
                        numberOfPages={1000}
                        onPageChange={page => { this.handlePage(page) }}
                        label={`Page - ${page + 1}`}
                    />
                </DataTable>
            </ScrollView>
        )
    }
}

export default Home
