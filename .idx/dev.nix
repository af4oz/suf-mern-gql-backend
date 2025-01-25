# To learn more about how to use Nix to configure your environment
# see: https://developers.google.com/idx/guides/customize-idx-env
{ pkgs, ... }: {
  # Which nixpkgs channel to use.
  channel = "stable-24.05"; # or "unstable"

  # Use https://search.nixos.org/packages to find packages
  packages = [
    # pkgs.go
    # pkgs.python311
    # pkgs.python311Packages.pip
    pkgs.nodejs_20
    pkgs.nodePackages.yarn
    # pkgs.nodePackages.nodemon
  ];

  services = {
    mongodb = {
      enable = true;
    };
  };

  # Sets environment variables in the workspace
  env = {
    MONGODB_URI = "mongodb://localhost:27017/";
    JWT_SECREET = "sdfjsdfjd";
  };
  idx = {
    # Search for the extensions you want on https://open-vsx.org/ and use "publisher.id"
    extensions = [
      "vscodevim.vim"
      "esbenp.prettier-vscode"
      "mongodb.mongodb-vscode"
    ];

    # Enable previews
    previews = {
      enable = true;
      previews = {};
    };

    # Workspace lifecycle hooks
    workspace = {
      # Runs when a workspace is first created
      onCreate = {
        # Example: install JS dependencies from NPM
        npm-install = "yarn install";
      };
      # Runs when the workspace is (re)started
      onStart = {
        # Example: start a background task to watch and re-build backend code
        watch-backend = "yarn server build && yarn server start:dev";
        start-database = "mongod --port 27017 --fork --logpath ./.idx/database.log --dbpath ./.idx/.data";
      };
    };
  };
}
