package waldemarapp.waldemar.ViewController;

import android.Manifest;
import android.content.pm.PackageManager;
import android.support.annotation.Nullable;
import android.support.v4.app.ActivityCompat;
import android.support.v4.content.ContextCompat;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;

import com.wikitude.architect.ArchitectStartupConfiguration;
import com.wikitude.architect.ArchitectView;

import java.io.IOException;

import waldemarapp.waldemar.R;

/**
 * The MainActivity where markers can be scanned.
 */
public class MainActivity extends AppCompatActivity {

    /*========== VARS ===============================*/
    private static final String WIKITUDE_KEY = "Hp/fXCJzZARFV7BHmgN9jCn6OBerUtUPX4mF+2gHUV8zfq1tyxUWdrrnGodkDrM5mcqfq8H5udGDcHVJ/M/Hvezoa9nH0BaMpW/fRiJxFr/A4SWaL5Rokl80uazjrJvGX1WrE/OGVVKYkwO9N33KPbZ0MbHp4chQB95Z7M8k1kNTYWx0ZWRfX6XJ+mvnPZ8m15Lu5AQutwKqPx4HGlN1S2rmFw81DERjkY3l2M8Ek4fiK7cMPw2eH6BiBihHRi1a2eGBZ1eA6v8yONwKVSdPp6ScIClHTi94tRfixwg3ORDh/eWIKUJF49mTzMw6D+iqekHmWK3l4V6MUuNCmYvkzTz8gRFQMe+QAspnV50k9guTiIflynztBnIZc8XdfUMBKra8HMLyKqUuRqj0OLs3Biv+jAxVHJvJdgo2BcLAaXVysySImAwY/oAvmf5+x/xkaAW0excDl2mdEbMVaPd2nPx9/SCAGxwXPefyMKmdVwuO1A8EP4aY69wFKzzzJJbYl4efOjv0QCvRhaRTGsnCz2maJTwZIewO7NvZ6GivMBK6F8HiZKeN/32vfnWx2qtAUjnjMchqVGK3schnSpTfGhkX5qMSwUkxqX3iv6VI6dsUMj0i15m8tGDK/xiLlan8D4vtoEFeVJQgoexYnFWS9HROybQWFH1JnFkdCw0NnWX+4LN7Fd9rUJQPDr/KRLKs3Pl/sCnlq3HMYmikqSXTMg==";

    private ArchitectView architectView;

    /*========== CUSTOM FUNCTIONS ===============================*/

    /**
     * You need to check and gain the camera permission to use the architectView.
     */
    private void cameraPermission() {
        // TODO: check why this doesnt work
        int permissionCheck = ContextCompat.checkSelfPermission(this,
                Manifest.permission.CAMERA);

        if (permissionCheck == PackageManager.PERMISSION_GRANTED) {
            // you have the permission, everything is fine
        } else {
            // you do not have the permission, so ask for it
            ActivityCompat.requestPermissions(this,
                    new String[]{Manifest.permission.CAMERA},
                    permissionCheck);
        }
    }

    /*========== LIFE CYCLE EVENTS ===============================*/

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        //Init Wikitude
        this.architectView = (ArchitectView)this.findViewById( R.id.architectView_main );
        final ArchitectStartupConfiguration config = new ArchitectStartupConfiguration();
        config.setLicenseKey(WIKITUDE_KEY);
        cameraPermission();
        this.architectView.onCreate( config );

    }

    @Override
    protected void onPostCreate(@Nullable Bundle savedInstanceState) {
        super.onPostCreate(savedInstanceState);
        architectView.onPostCreate();
        try {
            architectView.load("Test/index.html");
        } catch (IOException e) {
            e.printStackTrace();
            System.out.println("unable to load html file: " + e.getMessage());
        }
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        architectView.onDestroy();
    }

    @Override
    protected void onPause() {
        super.onPause();
        architectView.onPause();
    }

    @Override
    protected void onResume() {
        super.onResume();
        architectView.onResume();
    }



    /*========== GETTER & SETTER ===============================*/
}
