import React, { useState } from 'react'
import ProfileImageUploader from './ProfileImageUploader'
import EditableLabel from './EditableLabel'
import EditProfileBadge from './EditProfileBadge'

export const UserProfile = ({
  children,
  allowEditing,
  user,
  handleInputChange,
  updateProfile
}) => {
  return (
    <>
      <div className='user-profile margin-top-xxl margin-bottom-m'>
        <UserAvatar
          avatarURL={
            user?.profilePicture?.url ??
            `https://avatars.dicebear.com/api/jdenticon/${user.username}.svg`
          }
          allowEditing={allowEditing}
          userId={user.id}
          profilePicURL={user?.profilePicture?.url ?? null}
          profilePicId={user?.profilePicture?.id ?? null}
        />
        <UserDetails
          user={user}
          handleInputChange={handleInputChange}
          updateProfile={updateProfile}
          allowEditing={allowEditing}
        />
      </div>
      {allowEditing && <UserSettings user={user} />}
    </>
  )
}

export const UserAvatar = ({
  avatarURL,
  allowEditing,
  userId,
  profilePicURL,
  profilePicId
}) => {
  const [modalVisible, setModalVisible] = useState(false)

  return (
    <div className='user-profile-avatar'>
      <EditProfileBadge
        allowEditing={allowEditing}
        showModal={() => setModalVisible(true)}
      />
      <img
        className='user-profile-avatar-img'
        src={avatarURL}
        alt='User avatar'
      />
      {modalVisible && (
        <ProfileImageUploader
          userId={userId}
          show={modalVisible}
          setShow={setModalVisible}
          profilePicURL={profilePicURL}
          profilePicId={profilePicId}
        />
      )}
    </div>
  )
}

export const UserSettings = ({ user }) => {
  return (
    <div className='user-profile-settings'>
      <ul>
        <li>
          Email address:
          <span>{user?.email}</span>
        </li>
        <li>
          Username:
          <span>{user?.username}</span>
        </li>
        <li>
          <a className='link link-default' href='/changePassword'>
            Change password
          </a>
        </li>
      </ul>
    </div>
  )
}

export const UserDetails = ({
  user,
  handleInputChange,
  allowEditing,
  updateProfile
}) => {
  return (
    <div className='user-profile-details'>
      <EditableLabel
        type='text'
        name={'Name'}
        value={user.Name ?? user.username}
        className='input-default'
        handleInputChange={handleInputChange}
        allowEditing={allowEditing}
        updateProfile={updateProfile}
        placeholder='Your name'
      >
        <h2 className='user-profile-name'>
          {user.Name ? user.Name : user.username}
        </h2>
      </EditableLabel>
      <EditableLabel
        type='textArea'
        name={'Bio'}
        value={user.Bio}
        handleInputChange={handleInputChange}
        allowEditing={allowEditing}
        updateProfile={updateProfile}
        placeholder='Say something about yourself'
      >
        <p>
          {user.Bio ||
            (allowEditing ? 'Say something about yourself' : 'Hi There!')}
        </p>
      </EditableLabel>

      <div className='user-profile-extra'>
        <ul>
          {allowEditing || user.Profession ? (
            <li>
              Profession
              <EditableLabel
                type='text'
                name={'Profession'}
                value={user.Profession}
                handleInputChange={handleInputChange}
                allowEditing={allowEditing}
                updateProfile={updateProfile}
                placeholder='Your job title'
              >
                <span>
                  {!user.Profession ? 'Your job title' : user.Profession}
                </span>
              </EditableLabel>
            </li>
          ) : null}
          {allowEditing || user.Company ? (
            <li>
              Company
              <EditableLabel
                type='text'
                name={'Company'}
                value={user.Company}
                handleInputChange={handleInputChange}
                allowEditing={allowEditing}
                updateProfile={updateProfile}
                placeholder='Your company name'
              >
                <span>
                  {!user.Company ? 'Your company name' : user.Company}
                </span>
              </EditableLabel>
            </li>
          ) : null}
          {allowEditing || user.LinkedIn ? (
            <li>
              LinkedIn
              <EditableLabel
                type='text'
                name={'LinkedIn'}
                value={user.LinkedIn}
                handleInputChange={handleInputChange}
                allowEditing={allowEditing}
                updateProfile={updateProfile}
                placeholder='Your LinkedIn username'
              >
                <span>
                  {user.LinkedIn ? (
                    <a
                      className='link link-default'
                      href={`https://www.linkedin.com/in/${user?.LinkedIn}`}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      {user.LinkedIn}
                    </a>
                  ) : (
                    'Your LinkedIn username'
                  )}
                </span>
              </EditableLabel>
            </li>
          ) : null}
          {allowEditing || user.Twitter ? (
            <li>
              Twitter
              <EditableLabel
                type='text'
                name={'Twitter'}
                value={user.Twitter}
                handleInputChange={handleInputChange}
                allowEditing={allowEditing}
                updateProfile={updateProfile}
                placeholder='Your Twitter handle'
              >
                <span>
                  {user.Twitter ? (
                    <a
                      className='link link-default'
                      href={`https://twitter.com/${user?.Twitter}`}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      {user.Twitter ? `@${user.Twitter}` : ''}
                    </a>
                  ) : (
                    'Your Twitter handle'
                  )}
                </span>
              </EditableLabel>
            </li>
          ) : null}
        </ul>
      </div>
    </div>
  )
}

export default UserProfile
