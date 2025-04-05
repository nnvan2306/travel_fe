import { Box, Card, CardBody, Grid, GridItem, Heading, Icon, Image, Stack, Text } from '@chakra-ui/react';
import MainTemPlate from '../../templates/MainTemPlate';
import { useGetProducts } from '../../../service/product/get-products';
import { formatCurrencyVN } from '../../../helpers/formatVnd';
import icons from '../../../constants/icons';
import { useNavigate } from 'react-router-dom';
import { routesMap } from '../../../routes/routes';
import { useMemo } from 'react';
import { ProductResponseType } from '../../../type/product';

const Home = () => {
    const { data } = useGetProducts({});
    const rooms = useMemo(() => data?.data, [data]) as ProductResponseType[];
    const navigate = useNavigate();

    return (
        <MainTemPlate>
            <Box>
                <Grid templateColumns="repeat(3, 1fr)" columnGap={10} rowGap={10} mb={6}>
                    {rooms?.length
                        ? rooms.map((item) => {
                              return (
                                  <GridItem key={item?.id}>
                                      <Card
                                          maxW="sm"
                                          cursor="pointer"
                                          onClick={() =>
                                              navigate(routesMap.RoomDetail.replace(':id', String(item?.id)))
                                          }
                                      >
                                          <CardBody>
                                              <Image
                                                  src={item?.images[0]?.url}
                                                  alt="images"
                                                  borderRadius="md"
                                                  w="full"
                                                  height={160}
                                                  objectFit="cover"
                                              />
                                              <Stack mt="6" spacing="3">
                                                  <Heading
                                                      size="md"
                                                      style={{
                                                          display: ' -webkit-box',
                                                          WebkitBoxOrient: 'vertical',
                                                          overflow: 'hidden',
                                                          WebkitLineClamp: 2,
                                                      }}
                                                  >
                                                      {item?.name}
                                                  </Heading>
                                                  <Text color="#E03C31">
                                                      {formatCurrencyVN(Number(item?.price))} /Tháng
                                                  </Text>
                                                  <Text color="blue.600">
                                                      <Icon as={icons.location} /> {item?.address}
                                                  </Text>
                                              </Stack>
                                          </CardBody>
                                      </Card>
                                  </GridItem>
                              );
                          })
                        : null}
                </Grid>
            </Box>
        </MainTemPlate>
    );
};

export default Home;
