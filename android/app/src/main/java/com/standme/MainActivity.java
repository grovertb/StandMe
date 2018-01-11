package com.standme;

import android.content.Intent;

import com.aerofs.reactnativeautoupdater.ReactNativeAutoUpdater;
import com.aerofs.reactnativeautoupdater.ReactNativeAutoUpdaterActivity;
import com.facebook.react.ReactActivity;

public class MainActivity extends ReactNativeAutoUpdaterActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "StandMe";
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        MainApplication.getCallbackManager().onActivityResult(requestCode, resultCode, data);
    }

    // Add required methods
    /**
     *  URL for the metadata of the update.
     * */
    @Override
    protected String getUpdateMetadataUrl() {
        return "https://www.aerofs.com/u/8691535/update.android.json";
    }

    /**
     * Name of the metadata file shipped with the app.
     * This metadata is used to compare the shipped JS code against the updates.
     * */
    @Override
    protected String getMetadataAssetName() {
        return "metadata.android.json";
    }

    /**
     *
     *  If your updates metadata JSON has a relative URL for downloading
     *  the JS bundle, set this hostname.
     * */
    @Override
    protected String getHostnameForRelativeDownloadURLs() {
        return "https://www.dropbox.com";
    }

    /**
     *  Decide what type of updates to download.
     * Available options -
     *  MAJOR - will download only if major version number changes
     *  MINOR - will download if major or minor version number changes
     *  PATCH - will download for any version change
     * default value - PATCH
     * */
    @Override
    protected ReactNativeAutoUpdater.ReactNativeAutoUpdaterUpdateType getAllowedUpdateType() {
        return ReactNativeAutoUpdater.ReactNativeAutoUpdaterUpdateType.MINOR;
    }

    /**
     *  Decide how frequently to check for updates.
     * Available options -
     *  EACH_TIME - each time the app starts
     *  DAILY     - maximum once per day
     *  WEEKLY    - maximum once per week
     * default value - EACH_TIME
     * */
    @Override
    protected ReactNativeAutoUpdater.ReactNativeAutoUpdaterFrequency getUpdateFrequency() {
        return ReactNativeAutoUpdater.ReactNativeAutoUpdaterFrequency.EACH_TIME;
    }

    /**
     *  To show progress during the update process.
     * */
    @Override
    protected boolean getShowProgress() {
        return false;
    }
}
