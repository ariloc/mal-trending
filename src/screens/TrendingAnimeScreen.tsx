import { FlatList, ActivityIndicator, View } from 'react-native';
import { useInfiniteQuery } from '@tanstack/react-query'
import AnimeItemView from '../components/AnimeItemView';
import { useContext } from 'react';
import { MalRepoContext, RootStackParamList } from '../../App';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import LoadableScreen from '../components/LoadableScreen';

type TrendingAnimeScreenProps = NativeStackScreenProps<RootStackParamList, 'TrendingAnime'>;

function TrendingAnimeScreen ({navigation, route}: TrendingAnimeScreenProps) {
    const malRepo = useContext(MalRepoContext)

    const {
        data,
        isLoading,
        isLoadingError,
        fetchNextPage,
        refetch
    } = useInfiniteQuery({
        queryKey: ['trending-anime'],
        queryFn: ({ pageParam }) => malRepo.getAnimeRanking(pageParam),
        initialPageParam: 0,
        getNextPageParam: (lastPage, _) => lastPage.nextPage,
    });

    const ListEndLoader = () => {
        return (
            <ActivityIndicator style={{padding: 8}} />
        );
    };

    return (
        <LoadableScreen isLoading={isLoading} isError={isLoadingError} retryFn={refetch}>    
            <FlatList
                data = {data?.pages?.map((page,i) => page.data)?.flat() ?? []}
                renderItem={({item}) => 
                    <AnimeItemView 
                        item={item} 
                        navigateToDetails={(id: number, headerTitle: string) => 
                            navigation.navigate('AnimeDetails', {id, headerTitle})
                        } 
                    />
                }
                onEndReached={() => fetchNextPage()}
                onEndReachedThreshold={0.6}
                ListFooterComponent={ListEndLoader}
            />
        </LoadableScreen>
    );
}


export default TrendingAnimeScreen;
