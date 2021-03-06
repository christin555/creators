import React from 'react';
import {inject} from "mobx-react";
import s from './Case.module.scss';
import YouTube from "react-youtube";
import {
    Avatar,
    Button,
    Link,
    Paper
} from "@material-ui/core";
import CheckboxList from "./CheckboxList";

@inject(({CaseStore, RouterStore}) => {
    return {
        price: CaseStore.price,
        productionTime: (CaseStore.case || {}).productionTime,
        type: (CaseStore.case || {}).type,
        sphere: (CaseStore.case || {}).sphere,
        youtubeId:(CaseStore.case || {}).youtubeId,
        user: (CaseStore.case || {}).user || {},
        RouterStore
    };
})
class Search extends React.Component {
    goToChat = () => {
        const {RouterStore} = this.props;
        RouterStore.history.push({
            pathname: '/chat/1'
        })
    }
    opts = {
        playerVars: {
            rel: 0,
            showinfo: 0,
            iv_load_policy: 3,
            modestbranding: 1,
            fs: 0,
            loop: 1,
            controls: 0
        },
    };

    render() {
        const {
            price,
            productionTime,
            user,
            youtubeId
        } = this.props;

        return (
            <Paper className={s.content} elevation={3}>
                <YouTube
                    className={s.iframe}
                    videoId={youtubeId}
                    opts={this.opts}
                />
                <div className={s.info}>
                    <div className={s.header}>
                        <div>
                            <span className={s.titleS}>
                                Стоимость: {price} руб.
                            </span>
                            <span className={s.descTitle}>
                                Срок изготовления: {productionTime}
                            </span>
                        </div>
                        <Link
                            className={s.user}
                            href={`/profile/${user.id}`}
                        >
                            {user.firstName}
                            <Avatar
                                alt={user.firstName}
                                src={user.photoPath}
                            />
                        </Link>
                    </div>
                    <div>
                    </div>
                    <span className={s.titleBox}>
                        Что включено
                    </span>
                    <CheckboxList/>
                    <Button
                        onClick={this.goToChat}
                        variant='contained'
                        size={'small'}
                        color={'primary'}
                        className={s.buttonLink}
                    >
                        Перейти к странице заказа
                    </Button>
                </div>
            </Paper>
        );
    }
}

export default Search;
