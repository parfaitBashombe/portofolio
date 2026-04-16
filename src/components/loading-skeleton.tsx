export const LoadingSkeleton = () => {
  return (
    <div className="section-padding bg-accent">
      <div className="container-custom">
        <div className="animate-pulse space-y-8">
          {/* Section header skeleton */}
          <div className="text-center mb-16">
            <div className="h-10 bg-muted rounded-lg w-48 mx-auto mb-4"></div>
            <div className="h-6 bg-muted rounded-lg w-96 mx-auto"></div>
          </div>

          {/* Content skeleton */}
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="w-80 h-80 bg-muted rounded-2xl mx-auto lg:mx-0"></div>
              <div className="space-y-4">
                <div className="h-8 bg-muted rounded-lg w-3/4"></div>
                <div className="h-4 bg-muted rounded-lg"></div>
                <div className="h-4 bg-muted rounded-lg w-5/6"></div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="h-8 bg-muted rounded-lg w-64"></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-32 bg-muted rounded-lg"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
