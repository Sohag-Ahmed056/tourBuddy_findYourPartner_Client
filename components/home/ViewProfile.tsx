import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  MapPin, 
  Mail, 
  Globe, 
  Heart, 
  Star, 
  Calendar, 
  DollarSign,
  Users,
  Plane
} from "lucide-react";


const UserProfileComponent = ({ userData }: { userData: any }) => {
  const { email, profile, totalReviewCount, reviews } = userData;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Profile Header */}
        <Card className="overflow-hidden shadow-card animate-fade-in">
          <div className="h-32 bg-warm-gradient" />
          <CardContent className="relative pb-6">
            <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-16 sm:-mt-12">
              <Avatar className="h-28 w-28 border-4 border-card shadow-hero">
                <AvatarImage src={profile.profileImage} alt={profile.fullName} />
                <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-display">
                  {getInitials(profile.fullName)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 pt-2 sm:pt-0 sm:pb-2">
                <h1 className="text-3xl font-display font-bold text-foreground">
                  {profile.fullName}
                </h1>
                <div className="flex flex-wrap items-center gap-4 mt-2 text-muted-foreground">
                  <span className="flex items-center gap-1.5 text-sm">
                    <Mail className="h-4 w-4" />
                    {email}
                  </span>
                  <span className="flex items-center gap-1.5 text-sm">
                    <MapPin className="h-4 w-4" />
                    {profile.currentLocation}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-muted rounded-lg px-4 py-2">
                <Star className="h-5 w-5 text-primary fill-primary" />
                <span className="text-lg font-semibold">{totalReviewCount}</span>
                <span className="text-sm text-muted-foreground">Reviews</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bio Section */}
        <Card className="shadow-card animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <CardHeader>
            <CardTitle className="font-display text-xl flex items-center gap-2">
              <Heart className="h-5 w-5 text-primary" />
              About Me
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">{profile.bio}</p>
          </CardContent>
        </Card>

        {/* Interests & Countries Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Interests */}
          <Card className="shadow-card animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <CardHeader>
              <CardTitle className="font-display text-xl flex items-center gap-2">
                <Heart className="h-5 w-5 text-primary" />
                Interests
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {profile.interests.map((interest: string, index: number) => (
                  <Badge 
                    key={index} 
                    variant="secondary"
                    className="bg-primary/10 text-primary hover:bg-primary/20 capitalize px-3 py-1"
                  >
                    {interest}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Visited Countries */}
          <Card className="shadow-card animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <CardHeader>
              <CardTitle className="font-display text-xl flex items-center gap-2">
                <Globe className="h-5 w-5 text-purple-50" />
                Visited Countries
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {profile.visitedCountries.map((country: string, index: number) => (
                  <Badge 
                    key={index} 
                    variant="outline"
                    className="border-e-blue-500 text-foreground hover:bg-accent/10 px-3 py-1"
                  >
                    {country}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Travel Plans */}
        <Card className="shadow-card animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <CardHeader>
            <CardTitle className="font-display text-xl flex items-center gap-2">
              <Plane className="h-5 w-5 text-primary" />
              Travel Plans
            </CardTitle>
          </CardHeader>
          <CardContent>
            {profile.travelPlans.length > 0 ? (
              <div className="space-y-4">
                {profile.travelPlans.map((plan: any) => (
                  <div 
                    key={plan.id} 
                    className="p-4 rounded-lg border border-border bg-muted/30 hover:shadow-card-hover transition-shadow"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                      <div className="flex-1">
                        <h3 className="font-display text-lg font-semibold text-foreground">
                          {plan.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {plan.description}
                        </p>
                      </div>
                      <Badge 
                        className="w-fit bg-secondary text-secondary-foreground"
                      >
                        {plan.travelType}
                      </Badge>
                    </div>
                    <Separator className="my-3" />
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-4 w-4 text-primary" />
                        <span>{plan.city}, {plan.destination}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="h-4 w-4 text-primary" />
                        <span>{formatDate(plan.startDate)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="h-4 w-4 text-accent" />
                        <span>{formatDate(plan.endDate)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <DollarSign className="h-4 w-4 text-primary" />
                        <span>৳{plan.budgetMin.toLocaleString()} - ৳{plan.budgetMax.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-8">
                No travel plans yet
              </p>
            )}
          </CardContent>
        </Card>

        {/* Reviews Section */}
        <Card className="shadow-card animate-slide-up" style={{ animationDelay: '0.5s' }}>
          <CardHeader>
            <CardTitle className="font-display text-xl flex items-center gap-2">
              <Star className="h-5 w-5 text-primary" />
              Reviews ({totalReviewCount})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {reviews.length > 0 ? (
              <div className="space-y-4">
                {reviews.map((review: any) => (
                  <div 
                    key={review.id} 
                    className="p-4 rounded-lg border border-border bg-muted/30"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating 
                                ? 'text-primary fill-primary' 
                                : 'text-muted-foreground'
                            }`}
                          />
                        ))}
                      </div>
                      {review.reviewerName && (
                        <span className="text-sm text-muted-foreground">
                          by {review.reviewerName}
                        </span>
                      )}
                    </div>
                    <p className="text-muted-foreground">{review.comment}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Users className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
                <p className="text-muted-foreground">
                  No reviews yet
                </p>
                <p className="text-sm text-muted-foreground/70 mt-1">
                  Reviews from travel buddies will appear here
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserProfileComponent;
