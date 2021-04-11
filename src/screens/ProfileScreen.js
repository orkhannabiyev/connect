import React, { useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  FlatList,
} from 'react-native';
import { connect } from 'react-redux';
import { PostCard } from '../components';
import { selfPosts } from '../actions/SelfPostsAction';
import { logout } from '../actions/AuthActions';
import { getUser, removeUser } from '../actions/UserActions';
import { Loading } from '../components/Loading';

const ProfileScreen = ({
  user,
  route,
  navigation,
  userData,
  userLoading,
  getUser,
  posts,
  postsLoading,
  selfPosts,
  logout,
  removeUser,
}) => {
  useEffect(() => {
    getUser(route, user);
    selfPosts(route, user);
  }, []);

  const onLogout = () => {
    logout();
    removeUser();
  };

  const refresh = () => {
    getUser(route, user);
    selfPosts(route, user);
  };

  const profile = () => {
    return (
      <View style={styles.profileContainer}>
        <Image
          style={styles.userImg}
          source={{
            uri: userData
              ? userData.userImg ||
                'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg'
              : 'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg',
          }}
        />
        <Text style={styles.userName}>
          {userData ? userData.fname || 'Test' : 'Test'}{' '}
          {userData ? userData.lname || 'User' : 'User'}
        </Text>
        <Text style={styles.aboutUser}>
          {userData ? userData.about || 'No details added.' : ''}
        </Text>
        <View style={styles.userBtnWrapper}>
          {route.params ? (
            <>
              <TouchableOpacity style={styles.userBtn} onPress={() => {}}>
                <Text style={styles.userBtnTxt}>Message</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.userBtn} onPress={() => {}}>
                <Text style={styles.userBtnTxt}>Follow</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity
                style={styles.userBtn}
                onPress={() => {
                  navigation.navigate('EditProfile');
                }}>
                <Text style={styles.userBtnTxt}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.userBtn} onPress={onLogout}>
                <Text style={styles.userBtnTxt}>Logout</Text>
              </TouchableOpacity>
            </>
          )}
        </View>

        <View style={styles.userInfoWrapper}>
          <View style={styles.userInfoItem}>
            <Text style={styles.userInfoTitle}>{posts.length}</Text>
            <Text style={styles.userInfoSubTitle}>Posts</Text>
          </View>
          <View style={styles.userInfoItem}>
            <Text style={styles.userInfoTitle}>10,000</Text>
            <Text style={styles.userInfoSubTitle}>Followers</Text>
          </View>
          <View style={styles.userInfoItem}>
            <Text style={styles.userInfoTitle}>100</Text>
            <Text style={styles.userInfoSubTitle}>Following</Text>
          </View>
        </View>
      </View>
    );
  };

  const handleDelete = () => {};

  return (
    <SafeAreaView style={styles.container}>
      {userLoading ? (
        <Loading size={8} />
      ) : (
        <FlatList
          data={posts}
          renderItem={({ item }) => (
            <PostCard item={item} user={user} onDelete={handleDelete} />
          )}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={profile}
          onRefresh={refresh}
          refreshing={userLoading || postsLoading}
        />
      )}
    </SafeAreaView>
  );
};

const mapStateToProps = ({ auth, selfposts, user }) => ({
  user: auth.user,
  posts: selfposts.posts,
  postsLoading: selfposts.loading,
  userData: user.data,
  userLoading: user.loading,
});

const mapDispatchToProps = {
  selfPosts,
  getUser,
  logout,
  removeUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileContainer: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  activityIndicator: {
    color: 'black',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userImg: {
    height: 150,
    width: 150,
    borderRadius: 75,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
  aboutUser: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
  },
  userBtnWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 10,
  },
  userBtn: {
    borderColor: '#2e64e5',
    borderWidth: 2,
    borderRadius: 3,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 5,
  },
  userBtnTxt: {
    color: '#2e64e5',
  },
  userInfoWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 20,
  },
  userInfoItem: {
    justifyContent: 'center',
  },
  userInfoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  userInfoSubTitle: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
});
