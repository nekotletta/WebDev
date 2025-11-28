import React, { useEffect, useState } from 'react';
import '../styles/profile.css';
import { useParams, Link } from 'react-router-dom';


// all of these are descriptions from wikipedia except 2012
// 2012 source: https://leoniedawson.com/more-evidence-2012-was-the-best-year-ever/
const posts = [
    { 'title': "Information about My Little Pony", 
        'content': "My Little Pony: Friendship Is Magic is an animated television series based on Hasbro's My Little Pony franchise. The series follows a studious pony named Twilight Sparkle (Tara Strong), her dragon assistant Spike (Cathy Weseluck) and her friends, Applejack (Ashleigh Ball), Rarity (Tabitha St. Germain), Fluttershy (Andrea Libman), Rainbow Dash (Ball) and Pinkie Pie (Libman). They go on adventures and help others around Equestria, solving problems with their friendships.\n\n Animated in Flash, the series aired on Discovery Family (formerly The Hub) from October 10, 2010, to October 12, 2019. Hasbro selected animator Lauren Faust to head the show. Faust created deeper characters and adventurous settings, seeking a show resembling how she had played with her toys as a child, and incorporated fantasy elements. However, due to a hectic production schedule and a lack of creative control, she left the series during its second season.\n\n Friendship Is Magic became one of the highest-rated productions in The Hub's history. Despite its target demographic of young girls, the series attracted an unexpectedly large following of older viewers, mainly adult men, known as 'bronies'. The series gave Hasbro new merchandising opportunities. A spin-off franchise (My Little Pony: Equestria Girls) was launched in 2013 and ran alongside the series for six years. A feature-length film adaptation based on the television series, My Little Pony: The Movie, was released in October 2017 in the United States. My Little Pony: Pony Life, a spin-off comedy series, premiered on Discovery Family in November 2020.",
        "img": "https://upload.wikimedia.org/wikipedia/en/thumb/0/0d/My_Little_Pony_Friendship_Is_Magic_logo_-_2017.svg/1200px-My_Little_Pony_Friendship_Is_Magic_logo_-_2017.svg.png"
    }, 
    { "title": "What is Nightcore",
        "content": "A nightcore (also known as sped-up song, sped-up version, sped-up remix, or, simply, sped-up edit) is a version of a music track that increases the pitch and speeds up its source material by approximately 35%. This gives an effect identical to playing a 33⅓-RPM vinyl record at 45 RPM.\n\n The name is derived from the Norwegian musical duo 'Nightcore' (Norwegian pronunciation: [ˈnɑɪ̯tkɔːɾ]), who released pitch-shifted versions of trance and Eurodance songs. Nightcore is also almost always associated and accompanied with anime and otaku culture, with many YouTube thumbnails, and similar formats, of nightcore remixes containing anime characters and art.[4]\n\n Nightcore saw a general resurgence in popularity in the early 2020s due to TikTok, causing major recording labels to officially release 'sped-up' versions of their songs.",
        "img":"https://cdn-images.dzcdn.net/images/cover/b37055d6988de29e2287f12d3d00b6e1/0x1900-000000-80-0-0.jpg"
    },
    { "title": "What is Animal Jam (Classic)",
        "content": "Animal Jam Classic,[1] formerly known as Animal Jam, is a massively multiplayer online game developed by WildWorks and recommended for kids up to the age of 12. It was launched in 2010, in collaboration with the National Geographic Society.[2] As of late 2020, there were 3.3 million monthly active users and a lifetime total of 130 million registered players in 200 countries across both Animal Jam Classic and the mobile app spin-off Animal Jam.[3]\n\n In Animal Jam Classic, players can discover various facts about zoology using the game's numerous features, including mini-games, puzzles, adventures, parties, and social interactions. Due to its rapid growth, Animal Jam Classic has spawned different types of merchandise, including figurine toys, books, board games, and a subscription box.\n\n Although Animal Jam Classic is primarily played on PC, the Animal Jam Classic universe has been expanded to incorporate most mobile devices such as smartphones, tablets, and iOS devices. The most popular Animal Jam Classic mobile app spin-off is Animal Jam,[4] previously known as Animal Jam - Play Wild!, which is a 3D version of the Animal Jam Classic world. WildWorks has also developed other mobile apps based on the Animal Jam Classic game, including Tunnel Town, AJ Jump, and Dash Tag.\n\n In May 2020, in an event dubbed the 'aMAYzing Migration', WildWorks rebranded the desktop game from Animal Jam to Animal Jam Classic; as part of the event, the app that was formerly known as Animal Jam – Play Wild! was rebranded to Animal Jam.[5]\n",
        "img":"https://upload.wikimedia.org/wikipedia/en/thumb/2/27/Animal_Jam_Classic_logo.svg/1200px-Animal_Jam_Classic_logo.svg.png"
    },
    { "title": "Why 2012 is the best year",
        "content": "Evidence That 2012 Actually IS The Best Year Ever!\n\n Never has there been less hunger, less disease or more prosperity.\n Most developing countries are charging ahead, and people are being lifted out of poverty at the fastest rate ever recorded\nGlobal inequality is at its lowest in modern times.\n Extreme poverty was halved seven years ahead of schedule\n  The world’s not just getting richer, but fairer too.\n Fossil fuel consumption… fell by 4 per cent. This remarkable (and, again, unreported) achievement has nothing to do with green taxes or wind farms. It is down to consumer demand for more efficient cars and factories.\n Advances in medicine and technology mean that people across the world are living longer.\n The average life expectancy in Africa has increased by FIVE YEARS in the last decade.\n The number of people dying from AIDS has been in decline for the last eight years.\n Deaths from malaria have fallen by a fifth in half a decade.\n Nature can still wreak havoc, but as countries grow richer, they can better guard against devastation.\n There have been fewer war deaths in the last decade than any time in the last century.\n",
        "img":"https://res.cloudinary.com/people-matters/image/upload/fl_immutable_cache,w_624,h_351,w_624,h_351,c_scale/v1393495177/1449.jpg"
    }
]
const BlogPost = () => {

    const blogpost = useParams();
    const post = posts[blogpost.id];
    
    
    return (
        <div className='space-navbar'>
            <div className='row'>
                <img src={post.img}  className="rounded mx-auto d-block" style={{"maxHeight": "400px", "maxWidth": "400px"}}></img>
            </div>
            <div className='row'>
                <div className='col-sm-12'>
                    <h1 class="text-center">{post.title}</h1>
                </div>
            </div>
            <br></br>
            <div className='row'>
                <div className='col-sm-12 bg-info rounded'>
                    <p class="text-center format-json">{post.content}</p>
                </div>
            </div>
        </div>
    )
};

export default BlogPost;