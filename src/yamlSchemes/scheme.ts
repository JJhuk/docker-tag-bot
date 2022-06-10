export interface Fleet {
  spec: {
    template: {
      spec: {
        template: {
          spec: Spec;
        };
      };
    };
  };
}

export interface Deployment {
  spec: {
    template: {
      spec: Spec;
    };
  };
}

interface Spec {
  containers: Container[];
}

interface Container {
  image: string;
}
